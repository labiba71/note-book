import { Formik, Field, Form } from "formik";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { StyledRadio } from "../RadioButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Color } from "../../utils";
import "./AddCard.scss";
import React from "react";
import { connect } from "react-redux";
import { addNote } from "../../store/Action";
import { Note } from "../../store/Reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    date: {
      color: "grey",
    },
    title: {
      marginTop: "15px",
      fontWeight: 600,
    },
    details: {
      marginTop: "15px",
      fontWeight: 600,
    },
    textArea: {
      width: "100%",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      marginRight: "10px",
    },
  })
);

const validationSchema = yup.object({
  title: yup.string().required().max(100),
  details: yup.string().required().max(1000),
});

interface AddCardProps {
  noteList?: Note[] | undefined | any;
  addNote: (val: {}) => void;
  closeDialog: (Val: boolean) => void;
}

function AddCardComponent(props: AddCardProps) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("#FFFFFF");
  return (
    <div className={classes.root}>
      <Typography
        className={classes.date}
        variant="caption"
        display="block"
        gutterBottom
      >
        {new Date().toDateString()}
      </Typography>
      <Formik
        initialValues={{
          title: "",
          details: "",
          star: false,
          color: "",
          date: new Date().toDateString(),
          id: props.noteList.length,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          props.addNote(data);
          setSubmitting(false);
          props.closeDialog(false);
        }}
      >
        {({ values, isSubmitting, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="body1" gutterBottom>
              Note Title
            </Typography>
            <Field name="title">
              {({ field, meta }: any) => (
                <div>
                  <TextField
                    size="small"
                    fullWidth
                    id="title"
                    name="title"
                    variant="outlined"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Typography
              className={classes.details}
              variant="body1"
              gutterBottom
            >
              Note Details
            </Typography>
            <Field name="details">
              {({ field, meta }: any) => (
                <div>
                  <TextareaAutosize
                    name="details"
                    id="details"
                    className={classes.textArea}
                    rowsMin={5}
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="star">
              {({ field, meta }: any) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox name="star" />}
                    label="Make this note star"
                    {...field}
                  />
                </div>
              )}
            </Field>
            <div className="radio-group">
              {Color.map((color) => (
                <div key={color.code}>
                  <FormControlLabel
                    label=""
                    checked={selectedValue === color.value}
                    value={color.value}
                    control={<StyledRadio colorback={color.value} />}
                    name="color"
                    onChange={(e) => {
                      e.preventDefault();
                      values.color = color.value;
                      setSelectedValue(color.value);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="buttons">
              <Button
                className={classes.button}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                save
              </Button>
              <Button
                onClick={() => props.closeDialog(false)}
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = (state: { note: Note[] }) => {
  return {
    noteList: state.note,
  };
};
export const AddCard = connect(mapStateToProps, { addNote })(AddCardComponent);
