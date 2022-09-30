import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch } from 'hooks';
import POST_TYPES from 'store/post/post.types';
import { useSelector } from 'react-redux';
import { selectCurrentPost } from 'store/post/post.selectors';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen }: Props) {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch({ type: POST_TYPES.GET_ALL, payload: {} });
    setOpen(false);
  };

  const currentPost = useSelector(selectCurrentPost);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>TITLE: {currentPost.title}</DialogTitle>
        <DialogContent sx={{ width: '500px' }}>
          <DialogContentText id="alert-dialog-slide-description">
            MAIN INFO: {currentPost.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
