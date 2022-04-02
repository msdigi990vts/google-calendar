import GoogleLogin from 'react-google-login'
import { useDispatch } from 'react-redux'
import { setAuth } from '../app/index'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSuccess(res) {
        if (res.accessToken) {
            console.log(res)
            dispatch(setAuth(res.accessToken))
            navigate('/')
        }
    }

    function onFail(res) {
        console.log(res)
    }

    return (
        <div className="container py-20">
            <div className="max-w-xl mx-auto">
                <div className="mb-10 text-3xl text-center">Login</div>
                <div className="flex justify-center w-full">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={onSuccess}
                        onFailure={onFail}
                        cookiePolicy={'single_host_origin'}
                        scope="openid email profile https://www.googleapis.com/auth/calendar.events"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
