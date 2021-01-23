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
import React from "react";
import { connect } from "react-redux";
import { editNote } from "../../store/Action";
import { Note } from "../../store/Reducer";

const useStyles = makeStyles((theme) =>
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

interface EditCardProps {
  note: Note;
  closeDialog: (val: boolean) => void;
  editNote: (val: {}) => void;
}
function EditCardComponent(props: EditCardProps) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(props.note.color);
  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: props.note.title,
          details: props.note.details,
          star: props.note.star,
          color: props.note.color,
          date: props.note.date,
          id: props.note.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          props.editNote(data);
          setSubmitting(false);
          props.closeDialog(false);
        }}
      >
        {({ values, isSubmitting, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="date">
              {({ field, meta }: any) => (
                <div>
                  <Typography
                    className={classes.date}
                    variant="caption"
                    display="block"
                    gutterBottom
                    {...field}
                    name="date"
                    value={values.date}
                  >
                    {values.date}
                  </Typography>
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
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
                    value={values.star}
                    checked={values.star}
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
                edit
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
export const EditCard = connect(null, { editNote })(
  EditCardComponent
);
