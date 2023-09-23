import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ChatPrompt from './chatPrompt'; 
import { Grid } from '@mui/material';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true); //for chatPrompt
  const handleSend = (message: string) => {
    console.log("message sent:", message);
  }
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>DocGPT</h1>
      </div>
      
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        // style={{ height: '100vh' }}
      >
        <ChatPrompt isOpen={isOpen} onSend={handleSend}/>
      </Grid>
    </div>
  );
}

export default App;
