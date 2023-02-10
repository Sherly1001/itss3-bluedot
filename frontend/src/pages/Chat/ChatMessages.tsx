import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import axiosInstance from '../../requests/axiosInstance';
import { Chat } from '../../type/chat';
import { Shop } from '../../type/shop';
import { User } from '../../type/user';

export function ChatInfo({
  chat,
  isShop = false,
}: {
  chat: Chat;
  isShop: boolean;
}) {
  const avt = chat.from ? chat.from?.avatarUrl : chat.fromShop?.imageUrl;
  const name = chat.from
    ? isShop
      ? chat.from?.name
      : 'you'
    : chat.fromShop?.name;

  return (
    <Box
      sx={{
        display: 'flex',
        margin: '.5em',
        padding: '.5em',
        border: '1px solid #f0f0f0',
        borderRadius: '.3em',
      }}
    >
      <Box sx={{ margin: '.5em' }}>
        <Avatar src={avt} />
      </Box>
      <Box sx={{ flexGrow: '1' }}>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.8)' }}>
          {name}
          <Typography
            component="span"
            sx={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '.9em' }}
          >
            ・{new Date(chat.createdAt).toLocaleString()}
          </Typography>
        </Typography>
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '.9em' }}>
          {chat.content}
        </Typography>
      </Box>
      {chat.sending && (
        <Box sx={{ margin: '.5em', display: 'flex', alignItems: 'end' }}>
          <CircularProgress color="inherit" size="1em" />
        </Box>
      )}
    </Box>
  );
}

export function ChatMessages() {
  const socket = useSocket();

  const params = useParams();
  const ref = useRef<HTMLDivElement>(null);

  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [shopInfo, setShopInfo] = useState<Shop | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [toUserInfo, setToUserInfo] = useState<User | null>(null);

  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  function loadChats(page = 1) {
    setIsLoading(true);
    axiosInstance
      .get(`chat/${params.to}?page=${page}`)
      .then((res) => {
        const data = res?.data?.data;
        setChats((chats) => [
          ...chats,
          ...data?.items?.map((i: any) => ({
            id: i?._id,
            ...i,
          })),
        ]);
        setHasMore(data?.hasNext);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    axiosInstance.get('user').then((res) => {
      const data = res?.data?.data;
      setUserInfo(data);

      if (data?.adminOfShop) {
        axiosInstance.get('shop?search=' + data?.adminOfShop).then((res) => {
          setShopInfo(res?.data?.data?.[0]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (params.to) {
      axiosInstance
        .get('shop?search=' + params.to)
        .then((res) => {
          const data = res?.data?.data;
          setShopInfo(data?.[0]);
          loadChats(page);
        })
        .catch((err) => {
          console.log(err?.response?.data);
        });

      axiosInstance
        .get('user/' + params.to)
        .then((res) => {
          setToUserInfo(res?.data?.data);
        })
        .catch((err) => {
          console.log(err?.response?.data);
        });
    }
  }, [params]);

  useEffect(() => {
    if (!ref.current) return;

    let trigger = false;
    const loadMore = () => {
      if (!ref.current) return;

      if (
        !trigger &&
        ref.current.clientHeight - ref.current.scrollTop >=
          ref.current.scrollHeight - 100
      ) {
        trigger = true;
        if (!isLoading && hasMore) {
          loadChats(page);
        }
      }
    };

    ref.current.addEventListener('scroll', loadMore);

    return () => {
      ref.current?.removeEventListener('scroll', loadMore);
    };
  }, [ref, page, isLoading, hasMore]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected:', socket.id);
    });

    socket.on('msg', (data: Chat) => {
      setChats((chats) => {
        const idx = chats.findIndex(
          (c) =>
            c.sending &&
            c.content == data.content &&
            c.from?.id == data.from?.id,
        );

        let newChats = chats.slice();
        if (idx >= 0) {
          newChats[idx] = data;
        } else {
          newChats.unshift(data);
        }

        return newChats;
      });
    });

    socket.on('sendErr', (data) => {
      setErr(data.err);
      setChats((chats) =>
        chats.filter((c) => !(c.sending && c.content == data.raw.content)),
      );
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('msg');
      socket.off('sendErr');
    };
  }, [socket]);

  function onSend(e: any, toUserInfo: User | null, shopInfo: Shop | null) {
    e?.preventDefault();
    if (msg == '') return;

    const chat = {
      content: msg,
      createdAt: new Date(),
      sending: true,
    } as any;

    if (toUserInfo) {
      chat.fromShop = shopInfo;
      chat.to = { id: params.to };
    } else {
      chat.from = userInfo;
      chat.toShop = { id: params.to };
    }

    setChats([chat, ...chats]);

    socket.emit('sendMsg', { to: params.to, content: msg });

    setMsg('');
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          margin: '30px auto',
          marginTop: '10px',
          height: '75vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            padding: '.5em',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Avatar
            src={toUserInfo ? toUserInfo.avatarUrl : shopInfo?.imageUrl}
          />
          <Typography>
            {toUserInfo ? toUserInfo.name : shopInfo?.name}
          </Typography>
        </Box>
        <Box
          ref={ref}
          sx={{
            flexGrow: '1',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          {chats?.map((c, i) => (
            <ChatInfo key={i} chat={c} isShop={toUserInfo != null} />
          ))}
        </Box>
        <Box
          sx={{ padding: '.5em', display: 'flex' }}
          component="form"
          onSubmit={(e) => onSend(e, toUserInfo, shopInfo)}
        >
          <TextField
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="メッセージを入力してください"
            variant="outlined"
            autoComplete="off"
            sx={{
              flexGrow: '1',
              outline: 'none',
              border: '2px solid #f0f0f0',
              borderRadius: '.5em',
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ background: '#1677ff', ':hover': { background: '#4096ff' } }}
          >
            送信
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={err != ''}
        onClose={() => setErr('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Alert severity="error">送信に失敗しました</Alert>
      </Snackbar>
    </Container>
  );
}
