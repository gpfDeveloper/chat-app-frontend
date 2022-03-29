import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessageContentInput({ onSend }) {
  const [msg, setMsg] = useState('');
  const sendMsgHander = () => {
    if (msg.trim() !== '') {
      onSend(msg);
    }
    setMsg('');
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 4,
      }}
    >
      <TextField
        label="New message"
        multiline
        rows={4}
        fullWidth
        value={msg}
        onChange={(e) => setMsg(e.currentTarget.value)}
      />
      <Button
        variant="contained"
        size="large"
        endIcon={<SendIcon />}
        sx={{ alignSelf: 'flex-end' }}
        onClick={sendMsgHander}
      >
        Send
      </Button>
    </Box>
  );
}
