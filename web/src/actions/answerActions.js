
import { loading, success, failure } from "../actions/questionActions";

const URL_BASE = 'https://porfavor.herokuapp.com';

export function deleteAnswer(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/deleteAnswer/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {   
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/question/${id}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}