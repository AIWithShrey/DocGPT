import React from 'react';
import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // import plus icon

//onNewDoc to handle button click event
interface AddDocButtonProps {
  onNewDoc: () => void;
}

const AddDocButton: React.FC<AddDocButtonProps> = ({ onNewDoc }) => {
  return (
    <Box sx={{ 
        mt: 2,
        mb: 2
     }}> 
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onNewDoc}
        sx={{
          borderRadius: 50, // pill shape
          textTransform: 'none', // prevent uppercase transformation
        }}
      >
        Add new doc
      </Button>
    </Box>
  );
}

export default AddDocButton;
