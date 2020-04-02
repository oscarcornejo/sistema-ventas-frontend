import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Layout, Menu, Dropdown, Alert } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined, InboxOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

// PAGES
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PerfilUsuario from './pages/PerfilUsuario';
import Productos from './pages/Productos';
import CrearProducto from './pages/CrearProducto';
import AlertMessage from './components/AlertMessage';

// REACT-REDUX
import { useDispatch } from "react-redux";
import {setLogout} from './redux/actions/authActions';

// CSS
// import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import './App.css';
import EditarProducto from './pages/EditarProducto';



const { Header, Content, Footer, Sider } = Layout;

function App() {

  const dispatch = useDispatch();

  if(sessionStorage.token === null || sessionStorage.token === undefined) {
    console.log('sessionStorage:: ', sessionStorage.token);
    console.log('sessionStorage:: ', sessionStorage.token);
    dispatch(setLogout());
  }

  const [collapsed, setCollapsed] = useState(true);
  const [size, setSize] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    resizeWindow();
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    // setSize(window.innerWidth);
    if(size <= 768) {
      setCollapsed(true);
    } else {
      setCollapsed(true);
    }
}, [size]);

  let resizeWindow = () => {
    setSize(window.innerWidth);
  };

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  }

  const menu = (
    <Menu>
      
      <Menu.Item key="0">
        <Link to='/perfil-usuario'>
        <SmileOutlined style={{marginRight: '5px'}} />  Mi Perfil</Link>
      </Menu.Item>
      
      <Menu.Divider />

      <Menu.Item key="1">
      <LogoutOutlined /> Cerrar Sesión</Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>

        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <AppstoreOutlined />
                  <span>Dashboard</span>
                  <Link to="/dashboard" />
              </Menu.Item>
              <Menu.Item key="2">
                  <InboxOutlined />
                  <span>Productos</span>
                  <Link to="/productos" />
              </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16, paddingRight: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                { collapsed ? <MenuUnfoldOutlined className="trigger" style={{ cursor: 'pointer' }} onClick={toggle} /> : <MenuFoldOutlined className="trigger" style={{ cursor: 'pointer' }} onClick={toggle} /> }

                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <UserOutlined style={{fontSize: '22px', marginRight: '5px'}} />
                    <DownOutlined />
                  </a>
                </Dropdown>

            </Header>
            <Content style={{ 
              margin: '24px 16px', 
              padding: 24, 
              // background: '#fff',
              minHeight: 280 }}>
             
              <AlertMessage />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/crear-producto" component={CrearProducto} />
                <Route exact path="/perfil-usuario" component={PerfilUsuario} />
                <Route exact path="/editar-producto/:id" component={EditarProducto} />
              </Switch>
            </Content>
            
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
      </Layout>
    </Router>
    
      // <Router>
      //   <div>
      //     <Switch>
      //       <Route exact path="/" component={Login} />
      //       <Route exact path="/dashboard" component={Dashboard} />
      //       <Route exact path="/productos" component={Productos} />
      //       <Route exact path="/perfil-usuario" component={PerfilUsuario} />
      //     </Switch>
      //   </div>
      // </Router>
  );
}

export default App;
