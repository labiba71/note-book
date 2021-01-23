import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import { Note } from '../../store/Reducer';
import { deleteNote } from '../../store/Action'
import { connect } from "react-redux";
import { EditCard } from '../editCard/EditCard';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles =
  makeStyles({
    root: {
      width: '20rem',
      height: '14rem',
      textAlign: "left",
      backgroundColor: (props: { note: { color: string } }) => props.note && props.note.color,
      margin: "10px"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    title: {
      fontSize: '12px'
    },
    starSelected: {
      backgroundColor: '#FECD03',
      borderRadius: '50%',
      color: 'black'
    },
    noteDetail: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',

    },
    noteTitle: {
      width: '15rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })

interface CardProps {
  note: Note;
  deleteNote: (val: number) => void
}

const CardDetailsComponent = (props: CardProps) => {

  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {props.note && <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="star" >
              {props.note.star === true ?
                <StarsRoundedIcon className={classes.starSelected} />
                :
                null
              }
            </IconButton>
          }
          title={<Typography className={classes.noteTitle} variant="h6">{props.note && props.note.title}</Typography>}
        />
        <CardContent>
          <Typography className={classes.noteDetail} variant="body2" color="textPrimary" component="p">
            {props.note && props.note.details}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardFooter}>
          <Typography variant="body2" color="textPrimary" component="p">
            {props.note && props.note.date}
          </Typography>
          <div>
            <IconButton aria-label="delete">
              <DeleteOutlineOutlinedIcon onClick={(e) => {
                e.preventDefault();
                props.deleteNote(props.note.id);
              }} />
            </IconButton>
            <IconButton aria-label="edit">
              <BorderColorRoundedIcon onClick={handleClickOpen} />
            </IconButton>
          </div>
        </CardActions>
      </Card>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"New Note"}</DialogTitle>
        <DialogContent>
          <EditCard note={props.note} closeDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    noteList: state.note,
  };
};

export const CardComponent = connect(mapStateToProps, { deleteNote })(CardDetailsComponent);