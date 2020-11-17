import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";
import swal from "sweetalert2";
import moment from "moment";

export const recordsStartLoading = () =>{
    return async (dispatch) =>{
        try {
            const resp = await fetchConsult("historicos");
            const body = await resp.json();
            if (body.status === "success") {
                const records = body.records.map((e) => ({
                  ...e,
        
                  date: moment(e.date).toDate(),
                }));
                dispatch(recordsLoaded(records));

            }else {
                swal.fire("Error", body.msg, "error");
            }    
        } catch (error) {
            console.log(error);
        }
    }
}
export const recordsLoaded = (records) =>({
    type: types.RECORDS_LOADED,
    payload: records
})