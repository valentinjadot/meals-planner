import { POST_MESSAGE } from "./types";

export const postMessage = (data) => (dispatch) => {
  dispatch({
    type: POST_MESSAGE,
    payload: data,
  });
};
