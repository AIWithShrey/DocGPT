import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';

interface chatPromptProps {
  isOpen: boolean;
  onSend: (message: string) => void;
  onClose: () => void;
}

const ChatPrompt: React.FC<chatPromptProps> = ({ isOpen, onSend, onClose }) => {
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
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 300,
          padding: 2,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: 'background.paper'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box mt={1} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={() => onSend(message)}>Send</Button>
          <Button variant="text" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </motion.div>
  );
}

export default ChatPrompt;
