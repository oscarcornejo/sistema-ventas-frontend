import {api} from '../../config/urlConfig'
import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';

import {setAlert} from './alertActions';


// LOGIN DE USUARIO
export const setLogin = (email, password, history) => async (dispatch) => {

    const urlApi = `${api.url}/login`;
    const headers = {'Content-Type': 'application/json'}
    const data = {email, password};
    
    await axios.post(urlApi, data, headers)
    .then( response => {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data});
        dispatch(setCargarUsuario(response.data.user));
        history.push('/dashboard');
    }).catch( err => {
        console.log(err.response.data.message);
        dispatch(setAlert(err.response.data.message, 'danger')); 
        dispatch({type: LOGIN_FAIL});
    });
};

// CARGAR USUARIO
export const setCargarUsuario = (data) => async (dispatch) => {
    console.log('CARGAR USUARIO: ', data);
    if(sessionStorage.token) {
        dispatch({type: USER_LOADED, payload: data}); 
    } else {
        dispatch({ type: AUTH_ERROR });
    }
}

// LOGOUT / LIMPIAR PERFIL
export const setLogout = () => (dispatch) => {
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE});
}