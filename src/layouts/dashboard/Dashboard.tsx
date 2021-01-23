import React, { useState } from "react";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import "./Dashboard.scss";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import { CardComponent } from "../../components/card/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddCard } from "../../components/addCard/AddCard";
import { connect } from "react-redux";
import { Note } from "../../store/Reducer";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dialogWidth: {
    minWidth: "30rem",
  },
  starRound: {
    backgroundColor: "#FECD03",
    borderRadius: "50%",
    color: "black",
    margin: "1rem",
    cursor: "pointer"
  },
}));

interface DashboardProps {
  noteList?: Note[] | undefined | any;
}

export const StarList = (props: DashboardProps) => {
  return (
    <div className="cardList">
      {props && props.noteList
        .filter((item: Note) => item.star === true)
        .map((filteredNotes: Note) => (
          <div key={filteredNotes && filteredNotes.id}>
            <CardComponent note={filteredNotes} />
          </div>
        ))}
    </div>
  );
};

export const DashboardComponent = (props: DashboardProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [searchNotes, setSearchNotes] = useState("");
  const [searchFavorites, setSearchFavorites] = useState(false);

  const handleClickOpen = () => {
    if (props.noteList.length <= 30) {
      setOpen(true)
    } else {
      alert('You cannot add more than 30 notes')
    };
  };
  const handleClickStarOpen = () => {
    setSearchFavorites(!searchFavorites);
    console.log(searchFavorites);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-leftSidebar">
          <p>NOTEBOOK</p>
          <StarsRoundedIcon
            className={classes.starRound}
            fontSize="large"
            onClick={handleClickStarOpen}
          />
          <AddCircleRoundedIcon style={{cursor: "pointer"}} fontSize="large" onClick={handleClickOpen} />
        </div>
        <div className="dashboard-maincontent">
          <div className={classes.margin}>
            <Grid xs={12} container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  className="search"
                  onChange={(e) => {
                    e.preventDefault();
                    setSearchNotes(e.target.value);
                  }}
                  id="input-with-icon-grid"
                  label="Search"
                />
              </Grid>
            </Grid>
          </div>
          <h2>Notes</h2>
          <div className="cardList">
            {searchFavorites ? (
              <StarList noteList={props.noteList} />
            ) : searchNotes ? (
              props.noteList
                .filter(
                  (item: Note) =>
                    !item.title.toLowerCase().indexOf(searchNotes.toLowerCase())
                )
                .map((filteredNotes: Note) => (
                  <div key={ filteredNotes && filteredNotes.id}>
                    <CardComponent note={filteredNotes} />
                  </div>
                ))
            ) : (
                  props.noteList.map((note: Note) => {
                    return (
                      <div key={note && note.id}>
                        <CardComponent note={note} />
                      </div>
                    );
                  })
                )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"New Note"}</DialogTitle>
        <DialogContent>
          <AddCard closeDialog={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: { note: [] }) => {
  return {
    noteList: state.note,
  };
};

export const Dashboard = connect(mapStateToProps, null)(DashboardComponent);
