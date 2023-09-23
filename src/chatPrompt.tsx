import React from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

interface chatPromptProps {
  isOpen: boolean;
  onSend: (message: string) => void;
}

const ChatPrompt: React.FC<chatPromptProps> = ({ isOpen, onSend }) => {
  const [message, setMessage] = React.useState<string>('');

  // Animation variants for the chat box
  const boxVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 50 }
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={boxVariants}
      transition={{ duration: 0.5 }}
    >
    
      <Box
        sx={{
        //   position: 'fixed',
          bottom: 16,
          right: 16,
          width: 400,
          padding: 1,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          display: 'flex', //adds flexbox
          alignItems: 'center', //align items vertically centered
          border: '1px solid rgba(0, 0, 0, 0.23)'
        }}
      >
        
        <TextField
          sx={{
            ml: 1
          }}
          fullWidth
          variant="standard" //no border, was 'outlined'
          placeholder="Ask a question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            disableUnderline: true
          }}
        />
        {/* <Box ml={1}>
            <Button variant="contained" onClick={() => onSend(message)}>Send</Button>
        </Box> */}
        <IconButton onClick={() => onSend(message)} color="default">
            <SendIcon />
        </IconButton>
      </Box>
    </motion.div>
  );
}

export default ChatPrompt;
