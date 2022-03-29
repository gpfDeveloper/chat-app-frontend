import { Box, Typography, Link } from '@mui/material';
import MessageContent from './MessageContent';
import Users from './Users';

export default function ChatLayout({
  myID,
  users,
  currentSelectUser,
  selectUserHandler,
  sendMsgHandler,
}) {
  return (
    <>
      <Box>
        <Typography variant="h3">Chat App</Typography>
        <Typography color="text.secondary" mt={2}>
          Developed by{' '}
          <Link href="https://www.pengfeidevelopment.com" target="_blank">
            Pengfei Gao
          </Link>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignSelf: 'stretch' }}>
        <Users
          myID={myID}
          users={users}
          current={currentSelectUser}
          onSelectUser={selectUserHandler}
        />
        <MessageContent
          msgs={currentSelectUser?.messages}
          currentSelectUser={currentSelectUser}
          onSend={sendMsgHandler}
          myID={myID}
        />
      </Box>
    </>
  );
}
