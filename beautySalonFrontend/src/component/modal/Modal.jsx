import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className='text-xl text-center'>
          You Should have wait for 1 minute to start the backened server as server is running on free platform it takes time to start
        </p>

        <div className='flex justify-center mt-5'>
          <button className='bg-rose-500 px-4 py-3 rounded text-white font-bold ' onClick={handleClose}>OK</button>
        </div>
      </Box>
    </Modal>
  );
}
