import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Music from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import { initializeApp } from './../src/redux/appReducer'
import { compose } from 'redux'
import withRouter from './hoc/WithRouter'
import Preloader from './components/common/Preloader/Preloader'
import { ComponentType } from 'react'
import { AppStateType } from './redux/reduxStore'
import UsersPage from './components/Users/UsersContainer'

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SubMenu from 'antd/es/menu/SubMenu'
import Avatar from 'antd/es/avatar'
import { Col, Row } from 'antd/es/grid'
import AppHeader from './components/Header/Header'




const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>

      <AppHeader/>
      {/* <Header className='header'>
        <div className='logo' />
        <Row>
          <Col span={20}>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} />
          </Col>
          <Col span={4}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Col>
        </Row>


      </Header> */}

      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>


          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            // items={items2}
            >
              <SubMenu key='sub1' icon={<UserOutlined />} title='My Profile'>
                <Menu.Item key='1'>
                  <NavLink to='/profile'>Profile</NavLink>
                </Menu.Item>
                <Menu.Item key='2'>
                  <NavLink to='/dialogs'>Messages</NavLink>
                </Menu.Item>
                <Menu.Item key='3'>Empty</Menu.Item>
              </SubMenu>

              <SubMenu key='sub2' icon={<LaptopOutlined />} title='Users'>
                <Menu.Item key='4'>
                  <NavLink to='/users'>Users</NavLink>
                </Menu.Item>

                <Menu.Item key='5'></Menu.Item>
              </SubMenu>


            </Menu>
          </Sider>

          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Suspense fallback={<Preloader />}>
              <Routes >
                <Route path='/' element={<Navigate to={'/profile'} />} />
                <Route path='/profile/' element={<ProfileContainer />}>
                  <Route path=':userId' element={<ProfileContainer />} />
                </Route>
                <Route path='/dialogs/*' element={<DialogsContainer />} />
                <Route path='/users' element={<UsersPage pageTitle='Users' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/news' element={<News />} />
                <Route path='/music' element={<Music />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='*' element={<div>404 NOT FOUND</div>} />
              </Routes>
            </Suspense>

          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Social Network created 2023</Footer>

    </Layout>

  )
}
// class App extends React.Component<MapPropsType & DispatchPropsType> {

//   catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
//     alert('Some error ')
//   }

//   componentDidMount() {
//     this.props.initializeApp()
//     window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
//   }

//   render() {
//     if (!this.props.initialized) {
//       return <Preloader />
//     }

//     const {
//       token: { colorBgContainer },
//     } = theme.useToken();

//     return (    

//       <div className='app-wrapper'>
//         <HeaderContainer />

//         <Navbar />

//         <div className='app-wrapper-content'>
//           <Suspense fallback={<Preloader />}>
//             <Routes >

//               <Route 
//               // exact  
//               path='/' element={<Navigate to={'/profile'} />} />

//               <Route path='/profile/' element={<ProfileContainer />}>
//                 <Route path=':userId' element={<ProfileContainer />} />
//               </Route>

//               <Route
//                 path='/dialogs/*'
//                 element={<DialogsContainer />}
//               />

//               <Route
//                 path='/users'
//                 element={<UsersPage pageTitle='Users' />} />

//               <Route
//                 path='/login'
//                 element={<Login />} />

//               <Route path='/news'
//                 element={<News />} />

//               <Route
//                 path='/music'
//                 element={<Music />} />

//               <Route
//                 path='/settings'
//                 element={<Settings />} />

//               <Route
//                 path='*'
//                 element={<div>404 NOT FOUND</div>} />
//             </Routes>
//           </Suspense>
//         </div>
//       </div>
//     )
//   }
// }

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

