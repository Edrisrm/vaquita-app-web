import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";
import swal from "sweetalert2";

export const recordsStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(`historicos/${page_}`);
      const body = await resp.json();
      console.log(body);
      if (body.status === "success") {
        dispatch(recordsLoaded(body.data));
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const recordsLoaded = (records) => ({
  type: types.RECORDS_LOADED,
  payload: records,
});
