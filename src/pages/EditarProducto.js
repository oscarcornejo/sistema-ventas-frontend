import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import {api} from '../config/urlConfig';

// REACT ROUTER DOM
import { useParams, useHistory, useLocation } from "react-router-dom";

import { Row, Col, Card, Input, Button, Form, InputNumber, Upload, message, notification } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Select } from 'antd';

// REDUX
import { connect, useDispatch } from 'react-redux';
import { setAlert } from '../redux/actions/alertActions';

import noImage from '../assets/images/no_image.png'

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const EditarProducto = ({setAlert}) => {

    const { id } = useParams();

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

    const [producto, setProducto] = useState([]);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducto = async () => {
            const urlApi  = api.url + '/producto/obtener/'+id;
            const headers = {'Content-Type': 'application/json'}
            await axios.get(urlApi, headers).then( resp => {
                console.log('DATA PRODUCTO:: ', resp.data.producto);
                const dataProducto = resp.data.producto;
                setNombreProducto(dataProducto.nombre)
                setDescripcion(dataProducto.descripcion)
                setImagen(dataProducto.imagen);
                // setImgSelected(dataProducto.imagen);
                setPrecio_compra(dataProducto.precio_compra)
                setPrecio_venta(dataProducto.precio_venta)
                setStock(dataProducto.stock)
                setCategoria(dataProducto.idcategoria)
                setPuntos(dataProducto.puntos)
                // setProducto(dataProducto);
            }).catch( err => {
                console.log(err);
            });
        };
        getProducto();
    }, [id]);

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


    
    const editarProducto = async (e) => {
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

        console.log(imgSelected);
        console.log(noImage);

        var formData = new FormData();

        formData.append('nombre', nombreProducto);
        formData.append('descripcion', descripcion);
        formData.append('precio_compra', Number(precio_compra));
        formData.append('precio_venta', Number(precio_venta));
        formData.append('stock', Number(stock));
        formData.append('idcategoria', categoria);
        formData.append('puntos', Number(puntos));
        formData.append('imagen', imagen);

        // console.log(formData.get('nombre'));
        // console.log(formData.get('imagen'));

        
        let urlApi  = api.url + '/producto/editar/' + id + '/' + imagen;
        const headers = {'Content-Type': 'multipart/form-data'};
        await axios.put(urlApi, formData, headers)
        .then( resp => {
            console.log('resp.data:: ', resp.data);
        }).catch( err => {
            console.log(err);
        });
    };
  

    const imagenSeleccionada = e => {
        
        if(e.target.files && e.target.files[0]) {
            // console.log('imagenSeleccionada');
            const file = e.target.files[0];
            console.log('FILE:: ', file);
            setImagen(file);
            const reader = new FileReader();
            reader.onload = e => setImgSelected(reader.result);
            reader.readAsDataURL(file);
        }
    };

    console.log('imagen', imagen);
    console.log('imgSelected', imgSelected);
    


    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <div className='boxTitleSeccion'>
                        <span className='titleSeccion'><b>Editar Producto</b></span>
                    </div>
                </Col>
            </Row>

            
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16} >
                    <Card bordered={false} style={{ width: '100%' }}>

                        <div className='boxHeaderCard'>
                            <div>
                                <div className='boxTituloCard'>
                                    <b>Formulario Editar</b>
                                </div>
                                <div className='boxSubTituloCard'>
                                    <p>Edite el formulario para <strong>cambiar los datos de un Producto</strong></p>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '100%'}}>
                            
                        <Row>
                            <Col span={24}> 
                                <form onSubmit={editarProducto}>
                                <Row gutter={16}>
                                    <Col span={24} style={{marginBottom: '15px'}}> 
                                        <div>
                                            <p>Nombre Producto</p>
                                            <Input value={nombreProducto} placeholder="Nombre Producto" onChange={(e) => setNombreProducto(e.target.value)} />
                                        </div>
                                    </Col>

                                    <Col span={24} style={{marginBottom: '15px'}}> 
                                        <div>
                                            <p>Descripción del Producto</p>
                                            <TextArea value={descripcion} 
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
                                            <input value={precio_compra}  placeholder="$0000" onChange={(e) => setPrecio_compra(e.target.value)} />
                                        </div>
                                    </Col>
                                
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Precio Venta</p>
                                            <input value={precio_venta}  placeholder="$0000" onChange={(e) => setPrecio_venta(e.target.value)} />
                                        </div>
                                    </Col>

                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Stock Disponible</p>
                                            <input value={stock} placeholder="0000" onChange={(e) => setStock(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16} style={{marginBottom: '20px'}}>
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                            <p>Categoría</p>
                                            <select value={categoria || ''} style={{ width: 120 }} onChange={(e) => setCategoria(e.target.value)}>
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
                                            <input value={puntos}  placeholder="0000" onChange={(e) => setPuntos(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8} style={{marginBottom: '15px'}}>
                                        <div>
                                        <Button htmlType='submit' type="primary" size='middle'>
                                            Actualizar Producto
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

                            
                            {/* {
                                imgSelected ?
                                <img style={{width: '200px'}} src={imgSelected ? imgSelected : noImage } alt="imagen producto"/>
                                :
                                
                            } */}

                                <img style={{width: '200px'}} 
                                    src={imgSelected || `${api.url}/producto/img/${imagen}`} 
                                    alt="imagen producto"
                                />
                        

                            

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

export default connect(null, {setAlert})(EditarProducto);
