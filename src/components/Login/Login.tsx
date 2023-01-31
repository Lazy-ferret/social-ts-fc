import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'
import { login } from './../../redux/authReducer'
import LoginForm, { LoginFormValuesType } from './LoginForm'

const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const error = useSelector((state: AppStateType) => state.auth.error)

    const dispatch: any = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} error={error} captchaUrl={captchaUrl} />
        </div>
    )
}

export default Login