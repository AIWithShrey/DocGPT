import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ChatPrompt from './chatPrompt'; 

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ChatPrompt isOpen={isOpen} onSend={handleSend} onClose={handleClose} />
    </div>
  );
}

export default App;
