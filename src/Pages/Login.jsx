
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(null);


    const { setUser, googleLogin, loginWithEmailAndPass, isDark } = useContext(contextProvider);

    const handleLogin = (e) => {
        e.preventDefault();
        setErr(null);
        // Add authentication logic here
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        loginWithEmailAndPass(email, password)
            .then(res => {
                setUser(res.user);
                navigate('/');
                toast.success('Login Successful', {
                    style: {
                        background: 'green',
                        color: 'white',
                    }
                });
            })
            .catch(err => {
                if (err) {
                    setErr('Invalid Username or Password');
                }
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                setUser(res.user);
                navigate('/');
                toast.success('Login Successful', {
                    style: {
                        background: 'green',
                        color: 'white',
                    }
                });
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={`min-h-screen flex justify-center items-center ${isDark ? 'bg-[#1e1e1e]' : `bg-gray-50`}`}>
            <Helmet>
                <title>Login | Marathon Managemnet</title>
            </Helmet>
            <div className={`max-w-md w-full p-8 rounded-xl shadow-md ${isDark ? 'bg-[#444242]' : 'bg-white'}`}>
                <h2 className={`text-2xl font-bold text-center mb-6 ${isDark ? `text-[#d69327]` : `text-primary`}`}>Login</h2>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className={`${isDark ? `text-[#d69327]` : `text-gray-700`} block text-sm font-medium`}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            required
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${isDark && `bg-[#282006] text-slate-200`}`}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className={`${isDark ? `text-[#d69327]` : `text-gray-700`} block text-sm font-medium`}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            required
                            className={`w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${isDark && `bg-[#282006] text-slate-200`}`}
                            placeholder="Enter your password"
                        />
                    </div>

                    {
                        err && <div className='text-red-600'>{err}</div>

                    }

                    {/* Login Button */}
                    <button
                        type="submit"
                        className={`w-full  btn  ${isDark ? `btn-outline text-[#d69327] bg-[#1e1e1e] hover:bg-[#d69327] hover:text-white` : `btn-primary`}`}
                    >
                        Login
                    </button>
                </form>

                {/* Social Login */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} className={`w-full btn ${isDark ? `btn-outline text-[#d69327] bg-[#1e1e1e] hover:bg-[#d69327] hover:text-white` : `btn-primary`}`}>Continue with Google <span className='text-2xl'><FcGoogle /></span></button>
                    {/* You can replace Google button with GitHub or both */}
                    {/* <button className="w-full btn btn-outline btn-secondary">Login with GitHub</button> */}
                </div>

                {/* Register Link */}
                <div className="mt-4 text-center">
                    <p className={`text-sm  ${isDark ? `text-white`: `text-gray-600`}`}>
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className={` font-semibold hover:underline ${isDark ? `text-[#d69327]`: `text-primary`}`}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
