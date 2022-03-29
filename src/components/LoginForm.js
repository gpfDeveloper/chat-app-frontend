import { useRef, useState } from 'react';
import {
  Card,
  Box,
  TextField,
  CardContent,
  CardActions,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { Person } from '@mui/icons-material';

export default function LoginForm({ onLogin }) {
  const inputName = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const loginHandler = async (e) => {
    e.preventDefault();
    const name = inputName.current.value.trim();
    if (name.length < 3 || name.length > 7) {
      setErrorMsg('Name should be 3 ~ 7 charactors.');
    } else {
      setErrorMsg('');
      onLogin(name);
    }
  };
  return (
    <Box
      sx={{
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h3">Chat App</Typography>
        <Typography color="text.secondary" mt={2}>
          Developed by{' '}
          <Link href="https://www.pengfeidevelopment.com" target="_blank">
            Pengfei Gao
          </Link>
        </Typography>
      </Box>
      <Box component="form" onSubmit={loginHandler} autoComplete="off">
        <Card
          sx={{
            margin: '0 auto',
            width: '40rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                inputRef={inputName}
                label="Enter Your Name"
                variant="standard"
                fullWidth
                error={Boolean(errorMsg)}
                helperText={errorMsg}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" size="large">
              Join Chat
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
