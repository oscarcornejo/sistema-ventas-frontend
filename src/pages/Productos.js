import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import {api} from '../config/urlConfig'

import { Row, Col, Card, Input, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";

import '../assets/css/Productos.css';

const { Search } = Input;

const Productos = ({history}) => {

    const [termino, setTermino] = useState('');
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const getProductos = async () => {
            const urlApi  = api.url + '/productos/' + termino;
            const headers = {'Content-Type': 'application/json'}
            await axios.get(urlApi, headers).then( resp => {
                console.log(resp.data);
                resp.data.productos.map( (item, index) => (
                    item.key = item._id,
                    item.index = index + 1
                ));
                const dataProductos = resp.data.productos;
                setProductos(dataProductos);
            }).catch( err => {
                console.log(err);
            });
        };
        getProductos();
    }, [termino]);

    useEffect(() => {
        
    }, [productos]);


    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Imagen',
            dataIndex: 'imagen',
            key: 'imagen',
            render: imagen => <img width='125px' src={`${api.url}/producto/img/${imagen}`} alt='imagen producto' />,
        },
        {
          title: 'Nombre Producto',
          dataIndex: 'nombre',
          key: 'nombre',
        },
        {
            title: 'Precio Venta',
            dataIndex: 'precio_venta',
            key: 'precio_venta',
            render: precio => <span>${precio}</span>,
        },
        {
          title: 'Stock',
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: 'Acciones',
          key: 'action',
          render: (producto, record) => (
            <span>
              <Link style={{ marginRight: 15 }} to={`/editar-producto/${producto._id}`}>Ver</Link>
              <Link style={{ marginRight: 15 }} to={`/editar-producto/${producto._id}`}>Editar</Link>
              <Link to={`/editar-producto/${producto._id}`}>Eliminar</Link>
            </span>
          ),
        },
    ];

    const irACrearProducto = () => {
        history.push('/crear-producto')
    }



    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <div className='boxTitleSeccion'>
                        <span className='titleSeccion'><b>Productos</b></span>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Card bordered={false} style={{ width: '100%' }}>
                        
                        <div className='boxHeaderCard'>
                            <div>
                                <div className='boxTituloCard'>
                                    <b>Listado de Productos</b>
                                </div>
                                <div className='boxSubTituloCard'>
                                    <p>Puede agregar más producto en el botón <strong>'Agregar Producto'</strong></p>
                                </div>
                            </div>

                            <div>
                                <Button onClick={irACrearProducto} type="primary" icon={<PlusOutlined />} size='middle'>
                                    Crear Producto
                                </Button>
                            </div>
                        </div>
                        
                        <div>
                            <div style={{marginBottom: '20px'}}>
                                <Search placeholder="Ingresa un término y presiona Enter para buscar..." onSearch={value => setTermino(value)} style={{ width: '50%' }} />
                            </div>
                            <Table 
                            dataSource={productos} 
                            columns={columns} 
                            rowkey={record => record.key}
                            pagination={{ defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10', '20', '30']}} 
                            />;
                        </div>
                        
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Productos
