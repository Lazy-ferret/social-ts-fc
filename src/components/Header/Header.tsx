import Avatar from 'antd/es/avatar'
import { Col, Row } from 'antd/es/grid'
import { Header } from 'antd/es/layout/layout'
import Menu, { MenuProps } from 'antd/es/menu'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors'
import { logout } from '../../redux/authReducer'
import Button from 'antd/es/button';

const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: any = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    return (
        <Header className='header'>
            <Row>
                <Col span={20}>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']} items={items1} />
                </Col>
                <Col span={4}>
                    {isAuth
                        ? <div style={{ color: 'white' }}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            {login}
                            <Button onClick={handleLogout} type='default'>Logout</Button></div>
                        : <Button type='primary' >
                            <NavLink to={'/login'}>Login</NavLink>
                        </Button>
                    }
                </Col>
            </Row>
        </Header >
    )
}

export default AppHeader