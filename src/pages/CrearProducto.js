import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import {api} from '../config/urlConfig';

import { Row, Col, Card, Input, Button, Form, InputNumber, Upload, message, Alert, notification } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Select } from 'antd';

// REDUX
import { connect, useDispatch } from 'react-redux';
import { setAlert } from '../redux/actions/alertActions';

import noImage from '../assets/images/no_image.png'

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const CrearProducto = ({setAlert, history}) => {

    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [imgSelected, setImgSelected] = useState('');
    const [precio_compra, setPrecio_compra] = useState('');
    const [precio_venta, setPrecio_venta] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState(null);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [puntos, setPuntos] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategorias = async () => {
            const urlApi  = api.url + '/categorias/';
            const headers = {'Content-Type': 'application/json'}
            
            await axios.get(urlApi, headers)
            .then( resp => {
                console.log(resp.data);
                const setCategorias = resp.data.categorias;
                console.log(setCategorias);
                setDataCategorias(setCategorias);
            }).catch( err => {
                console.log(err);
            });
        }
        getCategorias();
    }, []);


    
    const crearProducto = async (e) => {
        e.preventDefault();
        
        if( nombreProducto  === '' && descripcion === '' &&
            imagen === '' && imagen === 0 && precio_compra === '' &&
            precio_venta === '' && stock === '' && puntos === ''
        ) {
            setAlert('Debe completar todos los campos.', 'danger');
            return false;
        }

        if (nombreProducto  === ''){
            await setAlert('Debes completar el campo Nombre Producto.', 'danger');
            return false;
        }

        if(imagen === '' || imagen === 0){
            console.log('Error');
            notification['error']({
                message: '¡Oops! Ocurrió un Error',
                description: 'Debe adjuntar una imagen para Crear un Producto.',
            });
            return false;
        }


        var formData = new FormData();

        formData.append('nombre', nombreProducto);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        formData.append('precio_compra', Number(precio_compra));
        formData.append('precio_venta', Number(precio_venta));
        formData.append('stock', Number(stock));
        formData.append('idcategoria', categoria);
        formData.append('puntos', Number(puntos));

        // console.log(formData.get('nombre'));
        const urlApi  = api.url + '/producto/registrar';
        // const headers = {'Content-Type': 'multipart/form-data'}

        await axios.post(urlApi, formData)
        .then( resp => {
            console.log(resp.data);
            history.push('/productos');
        }).catch( err => {
            console.log(err);
        });

        setImgSelected('');
    };

  

    const imagenSeleccionada = e => {
        console.log('imagenSeleccionada');
        if(e.target.files && e.target.files[0]) {
            console.log('imagenSeleccionada');
            const file = e.target.files[0];
            setImagen(file);
            const reader = new FileReader();
            reader.onload = e => setImgSelected(reader.result);
            reader.readAsDataURL(file);
        }
    };

    console.log(imagen);
    console.log(imgSelected);


    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <div className='boxTitleSeccion'>
                        <span className='titleSeccion'><b>Crear Producto</b></span>
                    </div>
                </Col>
            </Row>

            
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16} >
                    <Card bordered={false} style={{ width: '100%' }}>

                        <div className='boxHeaderCard'>
                            <div>
                                <div className='boxTituloCard'>
                                    <b>Formulario Crear</b>
                                </div>
                                <div className='boxSubTituloCard'>
                                    <p>Complete el formulario para <strong>agregar un Producto</strong></p>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '100%'}}>
                            
                        <Row>
                            <Col span={24}> 
                                <form onSubmit={crearProducto}>

                                
                                <Row gutter={16}>
                                    <Col span={24} style={{marginBottom: '15px'}}> 
                                        <div>
                                            <p>Nombre Producto</p>
                                            <Input placeholder="Nombre Producto" onChange={(e) => setNombreProducto(e.target.value)} />
                                        </div>
                                    </Col>

                                    <Col span={24} style={{marginBottom: '15px'}}> 
                                        <div>
                                            <p>Descripción del Producto</p>
                                            <TextArea
                                                onChange={(e) => setDescripcion(e.target.value)}
                                                placeholder="Descripción del Producto"
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                                />
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Precio Compra</p>
                                            <input placeholder="$0000" onChange={(e) => setPrecio_compra(e.target.value)} />
                                        </div>
                                    </Col>
                                
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Precio Venta</p>
                                            <input placeholder="$0000" onChange={(e) => setPrecio_venta(e.target.value)} />
                                        </div>
                                    </Col>

                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Stock Disponible</p>
                                            <input placeholder="0000" onChange={(e) => setStock(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16} style={{marginBottom: '20px'}}>
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Categoría</p>
                                            <select style={{ width: 120 }} onChange={(e) => setCategoria(e.target.value)}>
                                                <option value='default'>Seleccionar Categoría</option>
                                                {
                                                    dataCategorias.map( (item, index) => {
                                                        return <option key={index} value={item._id}>{item.titulo}</option>
                                                    })
                                                };
                                            </select>
                                        </div>
                                    </Col>

                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Puntos acumulables</p>
                                            <input placeholder="0000" onChange={(e) => setPuntos(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                        <Button htmlType='submit' type="primary" size='middle'>
                                            Subir Producto
                                        </Button>
                                        </div>
                                    </Col>
                                </Row>
                                </form>
                            </Col>
                        </Row>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={24} lg={8} xl={8}> 
                    <Card bordered={false} style={{ width: '100%' }}>
                        <div style={{textAlign: 'center'}}>
                            <img style={{width: '200px'}} src={imgSelected ? imgSelected : noImage} alt="imagen producto"/>

                            <div>
                                <input type="file" onChange={imagenSeleccionada} width='100%' />
                            </div>
                        </div>
                    </Card>     
                </Col>

            </Row>
        </Fragment>
    )
}

export default connect(null, {setAlert})(CrearProducto);
