import axios from 'axios';
import {setAlert} from  './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR,
} from './types';


//Get current users profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
    } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update profile
export const createProfile = (
    formData,
    history,             //method (push) redirect us to a client route
    edit = false         //show us whether it is editing or creating
  ) => async dispatch => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
    
        const res = await axios.post('/api/profile', formData, config);
    
        dispatch({
            type: GET_PROFILE,
            payload: res.data   //user's profile
        });
    
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');    //if creating a new profile
        }
    } catch (err) {
      const errors = err.response.data.errors; //if there is any errors from the response
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };