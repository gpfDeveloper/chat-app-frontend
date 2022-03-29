import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import MessageContentItem from './MessageContentItem';

export default function MessageContentItems({ items = [], myID }) {
  const msgBoxRef = useRef();
  useEffect(() => {
    const msgItems = msgBoxRef.current?.children;
    if (msgItems && msgItems.length > 0) {
      const lastMsg = msgItems[msgItems.length - 1];
      lastMsg.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [items]);
  return (
    <Box
      ref={msgBoxRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: 400,
        overflowY: 'auto',
        padding: 2,
      }}
    >
      {items.map((item, idx) => (
        <MessageContentItem
          key={idx}
          text={item.content}
          isSendByMe={item.from === myID}
        />
      ))}
    </Box>
  );
}
