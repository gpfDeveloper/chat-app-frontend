import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MessageContentItems from './MessageContentItems';
import MessageContentInput from './MessageContentInput';

export default function MessageContent({
  msgs,
  onSend,
  myID,
  currentSelectUser,
}) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ position: 'relative', flex: 1, height: isBelowMd ? 560 : 680 }}>
      <Box>
        <MessageContentItems items={msgs} myID={myID} />
      </Box>
      {currentSelectUser && currentSelectUser.userID !== myID && (
        <MessageContentInput onSend={onSend} />
      )}
    </Box>
  );
}
