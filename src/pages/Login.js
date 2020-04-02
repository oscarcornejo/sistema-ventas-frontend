import React, { Fragment } from 'react'
import { useEffect } from 'react'

// import axios from 'axios';
// import {api} from '../config/urlConfig'

import { useState } from 'react';

// REDUX
import { connect } from 'react-redux';
import {setAlert} from '../redux/actions/alertActions';
import {setLogin} from '../redux/actions/authActions';

import { Redirect } from "react-router-dom";

// ANT DESIGN
import { Card, Col, Row } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../assets/css/Login.css'

const Login = ({setLogin, history, isAuthenticated}) => {

    // const [id, setId] = useState('');
    // const [nombres, setNombres] = useState('')
    // const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [telefono, setTelefono] = useState('')
    // const [role, setRole] = useState('')

    const [token, setToken] = useState('')
    const [identity, setIdentity] = useState('');

    const [mensaje, setMensaje] = useState({
        error: false,
        mensaje: ''
    });


    useEffect(() => {
        

    }, []);

    const login = (e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            // setAlert('Los campos son obligatorios', 'danger');
            return;
        }
        
        // const urlApi = `${api.url}/login`
        // const headers = {"Content-Type": "application/json"}
        // const data =  {email, password}

        // axios.post(urlApi, data, headers)
        //   .then(function (response) {
        //       console.log('response:: ', response);
        //       const dataUser = response.data;
        //         setToken(dataUser.jwt);
        //         localStorage.setItem('token', dataUser.jwt);
        //         localStorage.setItem('identity', JSON.stringify(dataUser.user));
        //         props.history.push('/dashboard');
        //   })
        //   .catch(function (err) {
        //     // console.log(err);
        //     // console.log(err.message);
        //     // console.log(err.config);
        //     // console.log(err.code);
        //     // console.log(err.request);
        //     console.log(err.response.data.message);
        //     setMensaje({
        //         error: true,
        //         mensaje: err.response.data.message
        //     });
        // });
        setLogin(email, password, history);
    }

    const getToken = ()=> {
        let dataToken = localStorage.getItem('token');
        
        if(dataToken !== null || dataToken !== ''){
            setToken(dataToken);
        } else {
            setToken(null);
        }

        return token;
    }

    const getIdentity = ()=> {
        let dataIdentity = JSON.parse(localStorage.getItem('identity'));
        
        if(dataIdentity !== null || dataIdentity !== ''){
            setIdentity(dataIdentity);
        } else {
            setIdentity(null);
        }

        return identity;
    }

    const closeMensaje = () => {
        setMensaje({
            error: false,
            mensaje: ''
        });
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    const onFinish = values => {
        console.log('Received values of form: ', values);
        setLogin(values.email, values.password, history);
      };


    return (
        <Fragment>
            <div className="boxLogin">
            <Card bordered={false} className='cardLogin'>
                <div className='boxAuthLogoText'>
                    <h4 className="text-uppercase"><strong>¡Bienvenido!</strong></h4>
                    <p className='textMuted'>Inicie sesión para continuar.</p>
                </div>

                { mensaje.error === true &&
                                        
                    <div className='alert alert-danger alert alert-dismissible' role='alert'>
                        <div className="alert-message">
                        {mensaje.mensaje}
                        </div>
                        <button type='button' onClick={closeMensaje} className='close' data-dismiss='alert' aria-label='Close'>
                            <span aria-hidden>X</span>
                        </button>
                    </div>
                }

                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                    
                    <Form.Item name="email" rules={[{ required: true, message: '*Campo Obligatorio.' }]}>
                        <Input 
                        //  onChange={(e) => setEmail(e.target.value)}
                        type='email' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: '*Campo Obligatorio.' }]}>
                        <Input 
                        // onChange={(e) => setPassword(e.target.value)} 
                        type="password" prefix={<LockOutlined className="site-form-item-icon" />}  placeholder="Password"/>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Recordar Contraseña
                        </a>
                    </Form.Item>

                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Ingresar
                        </Button>
                        <br/><br/>
                        <a href="#!">Regístrate aquí!</a>
                    </Form.Item>
                </Form>
            </Card>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducers.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, setLogin})(Login);
