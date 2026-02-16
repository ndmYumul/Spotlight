import { BUILDING_LIST_REQUEST, BUILDING_LIST_SUCCESS, BUILDING_LIST_FAIL } from "../constants/buildingConstants";
import axios from "axios";

const listBuildings = () => async (dispatch) => {
    try {
        dispatch({ type: BUILDING_LIST_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/buildings/`);
        dispatch({ type: BUILDING_LIST_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: BUILDING_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }   
};

export { listBuildings };