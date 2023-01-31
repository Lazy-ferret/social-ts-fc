import { requiredField } from '../../utils/validators/validators'
import { Input } from '../common/FormsControl/FormsControl'
import { Field, Form } from 'react-final-form'
import style from './Login.module.css'

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormPropsType = {
    onSubmit: (values: LoginFormValuesType) => void
    error: string | null
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormPropsType> = (props) => {
    const { onSubmit, error, captchaUrl } = props

    return (
        <Form
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: null
            }}
            onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <Field
                            component={Input}
                            name={'email'}
                            validate={requiredField}
                            placeholder={'Email'} />
                    </div>
                    <div>
                        <Field
                            component={Input}
                            name={'password'}
                            type={'password'}
                            validate={requiredField}
                            placeholder={'Password'} />
                    </div>
                    <div>
                        <Field
                            component={Input}
                            name={'rememberMe'}
                            type={'checkbox'} /> remember me
                    </div>
                    {captchaUrl && <img src={captchaUrl} alt='captcha' />}
                    {captchaUrl && <Field
                        component={Input}
                        name={'captcha'}
                        validate={requiredField}
                        placeholder={'captcha'} />}

                    {error && <div className={style.formError}>{error}</div>}
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            )}
        </Form>
    )
}

export default LoginForm