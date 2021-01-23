import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from "./Type";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "rootReducer",
  storage,
};
export interface Note {
  id: number;
  title: string;
  details: string;
  star: boolean;
  color: string;
  date: Date;
}
const InitialState = {
  note: [{}],
};

export const rootReducer: any = (state = InitialState, action: any) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        note: [...state.note, action.payload],
      };
    case EDIT_NOTE:
      return {
        ...state,
        note: state.note.map((singleNote: any) => {
          if (action.payload.id === singleNote.id) {
            return {
              ...singleNote,
              title: action.payload.title,
              details: action.payload.details,
              star: action.payload.star,
              color: action.payload.color,
              date: action.payload.date,
            };
          } else {
            return singleNote;
          }
        }),
      };
    case DELETE_NOTE:
      return {
        ...state,
        note: state.note.filter(
          (singleNote: any) => singleNote && singleNote.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, rootReducer);
