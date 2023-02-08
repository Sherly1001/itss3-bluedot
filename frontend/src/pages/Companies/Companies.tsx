import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../requests/axiosInstance';
import { Company } from '../../type/company';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [rate, setRate] = useState<number | null>(0);

  const [selected, setSelected] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    axiosInstance.get('deliverer').then((res) => setCompanies(res.data.data));
  }, []);

  const handleRate = () => {
    const reqBody = {
      content: '',
      rate: rate || 5,
      item: null,
      shop: null,
      deliverer: selected,
    };
    axiosInstance.post('comment', reqBody).then((res) => {
      axiosInstance.get('deliverer').then((res) => setCompanies(res.data.data));
      setSuccess(true);
    });
    setRate(0);
    setSelected('');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', margin: '30px auto' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          運転会社の一覧表示
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {companies.map((company: Company) => (
            <Box
              key={company.id}
              sx={{
                border: '1px solid #333',
                padding: '20px',
                width: '80%',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                {company.name}
              </Typography>
              <Box sx={{ display: 'flex', padding: '0 10px' }}>
                <Box
                  sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                    gap: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      レート
                    </Typography>
                    <Box>
                      <Rating value={company.rate} precision={0.5} readOnly />
                    </Box>
                  </Box>
                  {localStorage.getItem('token') && (
                    <Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setSelected(company.id)}
                        startIcon={<StarBorderIcon />}
                      >
                        レート
                      </Button>
                      <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={!!selected}
                        onClose={() => setSelected('')}
                      >
                        <DialogTitle>ユーザーレート</DialogTitle>
                        <DialogContent>
                          <Rating
                            value={rate}
                            precision={0.5}
                            onChange={(_, value) => setRate(value)}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleRate}
                          >
                            編集
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setSelected('')}
                          >
                            キャンセル
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        onClose={() => setSuccess(false)}
                      >
                        <Alert
                          onClose={() => setSuccess(false)}
                          severity="success"
                          sx={{ width: '100%' }}
                        >
                          正常に評価されました
                        </Alert>
                      </Snackbar>
                    </Box>
                  )}
                </Box>
                <Box sx={{ flex: 2 }}>
                  <img src={company.imageUrl} style={{ height: '150px' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <img
                    src="https://www.bighospitality.co.uk/var/wrbm_gb_hospitality/storage/images/publications/hospitality/bighospitality.co.uk/article/2020/01/28/the-future-of-restaurant-delivery/3268223-2-eng-GB/The-future-of-restaurant-delivery.jpg"
                    style={{ height: '150px' }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Companies;
