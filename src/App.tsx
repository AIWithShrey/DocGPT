import React, {useState} from 'react';
import './App.css';
import ChatPrompt from './chatPrompt'; 
import AddDocButton from './AddDocButton';
import { Grid, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem'; //to delete?
import Select from '@mui/joy/Select'; //keep
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Box from '@mui/material/Box';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';

const materialTheme = materialExtendTheme();

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false); //dark mode states
  const [isOpen] = useState<boolean>(true); //for chatPrompt
  const [isModalOpen, setModalOpen] = useState<boolean>(false); //for addDoc modal
  const [message, setMessage] = useState<string | null>(null); //new state for msg
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // for select and option tags

  const handleSelectChange = (value: string) => {
      setSelectedOption(value);
      // Handle other logic based on the selected option if needed
      console.log("Selected Option:", value);
  };
  const handleSend = (message: string) => {
    console.log("message sent:", message);
    setMessage(message);  // Update the message state with the sent message
  }
  const handleNewDoc = () => {
    console.log("new doc clicked");
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false); 
  }

  const headerBackgroundColor = darkMode ? '#434343' : '#e0e0e0';
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', //set mode based on state
      background: {
        default: darkMode ? '#303030' : '#fafafa', //bkg colors
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#333', //txt colors
      },
    },
  })

  const handleConversationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleConversationClose = () => {
    setAnchorEl(null);
  };

  const handleChange = () => {
    console.log('change')
  };

  const ModeToggle = () => {
    const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
    const { setMode: setJoyMode } = useJoyColorScheme();
    const toggleMode = () => {
      const newMode = mode === 'dark' ? 'light' : 'dark';
      setMaterialMode(newMode);
      setJoyMode(newMode);
    };
    return (
      <Button onClick={toggleMode}>
        {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Button>
    );
  };  

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>

    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: theme.palette.background.default}}>
        {/* Header */}
        <div className="Header" style={{  padding: '0vh 5vw', margin: '0vw 0vw 3vh 0vw', backgroundColor: headerBackgroundColor }}>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Left side - Header */}
            <Grid item>
              <h1 style={{ color: theme.palette.text.primary }}>DocGPT</h1>
            </Grid>
            {/* Right side - Doc Button and Conversation Drop-Down */}
            <Grid item>
              {/* Nest the two buttons in a box to fit horizontally */}
              <Box display="flex" alignItems="center">
                <AddDocButton onNewDoc={handleNewDoc} /> 
                <Button
                  variant="contained"
                  endIcon={<ArrowDropDownIcon />}
                  onClick={handleConversationClick}
                  sx={{ marginLeft: 2, borderRadius: '25px'  }} //pill-shaped
                >
                  New Conversation
                </Button>
                <Select
                  // value={selectedOption}
                  onChange={(event, value) => {
                    if (value) {
                      handleSelectChange(value as string);
                    }
                  }}
                              
                  // style={{ marginLeft: '8px', width: 'fit-content' }}
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                </Select>
                <ModeToggle />

              </Box>
            </Grid>
          </Grid>
        </div>
        
        {/* stack holds the new doc button and prompt */}
        <Stack alignItems={'center'}>
          
          {/* Modal for new doc below */}
          <Dialog 
            open={isModalOpen} 
            onClose={handleCloseModal}
            maxWidth="md" //medium width. can do lg, xl, false
            fullWidth={true} //takes full width of container
            PaperProps={{
              sx: {
                position: 'absolute',
                top: '20%'
                // marginTop: '10vh'
              }
            }}
          >
            <DialogTitle>Add New Document</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the document name:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="docName"
                label="Document Name"
                fullWidth
              />
              <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => {
                handleCloseModal();
                // Any additional logic you want to run when the user confirms can go here.
                }} color="primary">
                  Add
                </Button>
              </DialogActions>

            </DialogContent>
          </Dialog>
          {/* Grid that holds the prompt and send icon */}
          <Grid
          container
          justifyContent="center"
          alignItems="center"
          // style={{ height: '100vh' }}
        >
          <ChatPrompt isOpen={isOpen} onSend={handleSend}/>
        </Grid>
        {/* Display msg below ChatPrompt */}
        {message && <Typography variant='body1' mt={2}>{message}</Typography> }

        {/* MOVE THIS: */}
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </Button>
        </Stack>
        

        
      </div>
    </ThemeProvider>
    </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
