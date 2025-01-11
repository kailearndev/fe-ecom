import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = () => {

        localStorage.setItem("token", 'token')
        navigate('/')
    }
    return (
        <div className="h-svh flex justify-center items-center flex-col gap-6 shadow-xl ">
            <button onClick={handleSubmit} type="submit" className="btn hover:rotate-6">Test thử nhé </button>
        </div>
    );
};

export default Login;