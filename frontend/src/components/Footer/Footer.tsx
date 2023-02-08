import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#e91e63',
        padding: '10px',
        width: '100%',
        opacity: '0.7',
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              color: '#fff',
            }}
          >
            @ 二、三イカ
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
