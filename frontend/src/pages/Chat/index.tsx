import { Avatar, Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../requests/axiosInstance';
import { Chat } from '../../type/chat';
import { User } from '../../type/user';

export function ChatInfo({
  chat,
  isShop = false,
}: {
  chat: Chat;
  isShop: boolean;
}) {
  const shop = chat.fromShop ? chat.fromShop : chat.toShop;
  const user = chat.from ? chat.from : chat.to;
  const name = chat.from
    ? isShop
      ? chat.from?.name
      : 'you'
    : chat.fromShop?.name;

  return (
    <NavLink to={isShop ? user?.id : shop?.id}>
      <Box
        sx={{
          display: 'flex',
          margin: '.5em',
          padding: '.5em',
          border: '1px solid #f0f0f0',
          borderRadius: '.3em',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s,border-color 0.2s',
          ':hover': {
            borderColor: 'transparent',
            boxShadow:
              '0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          },
        }}
      >
        <Box sx={{ margin: '.5em' }}>
          <Avatar src={isShop ? user?.avatarUrl : shop?.imageUrl} />
        </Box>
        <Box>
          <Typography sx={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            {isShop ? user?.name : shop.name}
            <Typography
              component="span"
              sx={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '.9em' }}
            >
              ・{new Date(chat.createdAt).toLocaleString()}
            </Typography>
          </Typography>
          <Typography sx={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: '.9em' }}>
            {name}: {chat.content}
          </Typography>
        </Box>
      </Box>
    </NavLink>
  );
}

export function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance.get('user').then((res) => {
      setUserInfo(res?.data?.data);
    });
  }, []);

  function loadChats(page = 1) {
    setIsLoading(true);
    axiosInstance
      .get(`chat?page=${page}`)
      .then((res) => {
        const data = res?.data?.data;
        setChats([
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
    loadChats(page);
  }, []);

  useEffect(() => {
    let trigger = false;
    const loadMore = () => {
      if (
        !trigger &&
        window.innerHeight + document.documentElement.scrollTop >=
          (document.scrollingElement?.scrollHeight ?? 0) - 100
      ) {
        trigger = true;
        if (!isLoading && hasMore) {
          loadChats(page);
        }
      }
    };

    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [page, isLoading, hasMore]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ margin: '30px auto' }}>
        {chats?.map((c) => (
          <ChatInfo key={c.id} chat={c} isShop={!!userInfo?.adminOfShop} />
        ))}
      </Box>
    </Container>
  );
}
