import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { List } from '@mui/material';
import UserItem from './UserItem';

export default function Users({ users, current, onSelectUser, myID }) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: isBelowMd ? 172 : 360,
        borderRight: 1,
        borderColor: 'divider',
        padding: 2,
      }}
    >
      {users.map((user) => (
        <UserItem
          myID={myID}
          key={user.userID}
          userName={user.userName}
          userID={user.userID}
          current={current}
          onClick={onSelectUser}
          connected={user.connected}
          hasUnreadMsg={user.hasUnreadMsg}
        />
      ))}
    </List>
  );
}
