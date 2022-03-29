import { useState, useEffect } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ChatLayout from './components/chat/ChatLayout';
import LoginForm from './components/LoginForm';

import socket from './socket';

export default function Home() {
  const theme = createTheme({
    palette: { mode: 'dark', primary: { main: '#BF9CFA' } },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  });
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentSelectUser, setCurrentSelectUser] = useState(null);
  const [myID, setMyID] = useState(null);

  const loginHandler = (name) => {
    setIsLogin(true);

    socket.auth = { userName: name };
    socket.connect();
  };

  const selectUserHandler = (userID) => {
    const selectedUserIdx = users.findIndex((user) => user.userID === userID);
    const newUsers = [...users];
    newUsers[selectedUserIdx].hasUnreadMsg = false;
    setCurrentSelectUser(newUsers[selectedUserIdx]);
    setUsers(newUsers);
  };

  const sendMsgHandler = (msg) => {
    socket.emit('private message', {
      content: msg,
      to: currentSelectUser.userID,
    });
    const newCurrentSelectedUser = { ...currentSelectUser };
    newCurrentSelectedUser.messages = [...currentSelectUser.messages];
    newCurrentSelectedUser.messages.push({
      from: myID,
      to: currentSelectUser.userID,
      content: msg,
    });
    setCurrentSelectUser(newCurrentSelectedUser);
    const currentSelectUserIdx = users.findIndex(
      (user) => user.userID === currentSelectUser.userID
    );
    const newUsers = [...users];
    newUsers[currentSelectUserIdx] = newCurrentSelectedUser;
    setUsers(newUsers);
  };

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
      setIsLogin(true);
    }
    socket.on('invalid session', () => {
      setIsLogin(false);
      localStorage.removeItem('sessionID');
      socket.disconnect();
    });
    return () => {
      socket.off('invalid session');
    };
  }, [isLogin]);

  useEffect(() => {
    socket.on('users', (users) => {
      setUsers(users);
    });

    socket.on('session', (session) => {
      setMyID(session.userID);
      localStorage.setItem('sessionID', session.sessionID);
    });

    socket.on('user connected', (user) => {
      const connectedUserIdx = users.findIndex(
        (item) => item.userID === user.userID
      );
      const newUsers = [...users];
      if (connectedUserIdx !== -1) {
        newUsers[connectedUserIdx].connected = true;
      } else {
        newUsers.push(user);
      }
      setUsers(newUsers);
    });

    socket.on('user disconnected', (userID) => {
      const disconnectedUserIdx = users.findIndex(
        (user) => user.userID === userID
      );
      if (disconnectedUserIdx !== -1) {
        const newUsers = [...users];
        newUsers[disconnectedUserIdx].connected = false;
        setUsers(newUsers);
      }
    });

    socket.on('private message', (message) => {
      const { content, from, to } = message;
      const newUsers = [...users];
      const updateUserIdx = newUsers.findIndex((user) => user.userID === from);
      if (updateUserIdx !== -1) {
        newUsers[updateUserIdx].messages.push({ content, from, to });
      }
      if (currentSelectUser && currentSelectUser.userID === from) {
        const newCurrentSelectedUser = { ...newUsers[updateUserIdx] };
        setCurrentSelectUser(newCurrentSelectedUser);
      } else {
        newUsers[updateUserIdx].hasUnreadMsg = true;
      }
      setUsers(newUsers);
    });
    return () => {
      socket.off('users');
      socket.off('session');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('private message');
    };
  }, [users, myID, currentSelectUser?.userID]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLogin && <LoginForm onLogin={loginHandler} />}
      {isLogin && (
        <Box
          sx={{
            marginTop: '2rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4rem',
          }}
        >
          <ChatLayout
            myID={myID}
            users={users}
            currentSelectUser={currentSelectUser}
            selectUserHandler={selectUserHandler}
            sendMsgHandler={sendMsgHandler}
          />
        </Box>
      )}
    </ThemeProvider>
  );
}
