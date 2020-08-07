import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_USER,
    UPDATE_PROFILE,
    DELETE_ACCOUNT
} from './types';

import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);
                
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function updateUser(dataToSubmit){
    const request = axios.put(`${USER_SERVER}/updateuser`, dataToSubmit)
                .then(response => response.data);
                
    return {
        type: UPDATE_USER,
        payload: request
    }
}

export function updateProfile(dataToSubmit){
    console.log(dataToSubmit, 'is the data to submt for update profile')
    const request = axios.put(`${USER_SERVER}/updateProfile/${dataToSubmit.id}`, dataToSubmit)
                .then(response => response.data);
                
    return {
        type: UPDATE_PROFILE,
        payload: request
    }
  }

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function deleteAccount(dataToSubmit){
    const request = axios.delete(`${USER_SERVER}/deleteuser/${dataToSubmit.id}`, dataToSubmit)
                .then(response => response.data);
                
    return {
        type: DELETE_ACCOUNT,
        payload: request
    }
}



// router.delete("/deleteuser/:id", (req, res) => {
//     User.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).send({
//             success: true
//         });
//     });
// });