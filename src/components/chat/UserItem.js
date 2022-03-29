import { ListItemButton, Typography, Box, Divider } from '@mui/material';

export default function UserItem({
  userName,
  onClick,
  current,
  userID,
  myID,
  connected,
  hasUnreadMsg = false,
}) {
  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        onClick={onClick.bind(null, userID)}
        selected={userID === current?.userID}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box
            sx={{
              height: 10,
              width: 10,
              bgcolor: connected ? 'lightGreen' : 'text.disabled',
              borderRadius: '50%',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <Typography>{userName}</Typography>
            {myID === userID && (
              <Typography variant="body2" color="text.secondary">
                &nbsp;(myself)
              </Typography>
            )}
            {hasUnreadMsg && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: -12,
                  height: 8,
                  width: 8,
                  borderRadius: '50%',
                  backgroundColor: '#f50057',
                }}
              ></Box>
            )}
          </Box>
        </Box>
      </ListItemButton>
      <Divider component="li" />
    </>
  );
}
