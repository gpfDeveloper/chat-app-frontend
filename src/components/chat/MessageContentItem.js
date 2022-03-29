import { Card, Typography } from '@mui/material';

export default function MessageContentItem({ text, isSendByMe }) {
  return (
    <Card
      sx={{
        alignSelf: isSendByMe ? 'flex-start' : 'flex-end',
        padding: 2,
        overflow: 'initial',
        maxWidth: '70%',
      }}
    >
      {isSendByMe && (
        <Typography color="text.secondary" variant="body2">
          (myself):
        </Typography>
      )}
      <Typography mt={1}>{text}</Typography>
    </Card>
  );
}
