import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from "./Type";

export const addNote = (data: any) => async (dispatch: any) => {
  dispatch({ type: ADD_NOTE, payload: data });
};

export const editNote = (data: any) => async (dispatch: any) => {
  console.log(data);

  dispatch({ type: EDIT_NOTE, payload: data });
};

export const deleteNote = (data: any) => async (dispatch: any) => {
  console.log(data);

  dispatch({ type: DELETE_NOTE, payload: data });
};
