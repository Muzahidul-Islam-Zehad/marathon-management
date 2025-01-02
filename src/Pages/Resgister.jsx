
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from '../Providers/AuthProvider';

const RegisterPage = () => {

    const { setUser, googleLogin, registerWithEmailPass, updateProfileUser, setLoading } = useContext(contextProvider);

    const [err, seterr] = useState(null);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Add registration logic here
        seterr(null);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const updateProfileData = { displayName: name, photoURL: photo };

        const upperCaseRegX = /[A-Z]/;
        const lowerCaseRegX = /[a-z]/;

        if (password.length < 6) {
            seterr('number');
            return;
        }
        if (!upperCaseRegX.test(password)) {
            seterr('upper');
            return;
        }
        if (!lowerCaseRegX.test(password)) {
            seterr('lower');
            return;
        }

        registerWithEmailPass(email, password)
            .then((res) => {
                const user = res.user;
                updateProfileUser(updateProfileData)
                    .then(() => {
                        user.reload()
                            .then(() => {
                                setUser({ ...user });
                                form.reset();
                                setLoading(false);
                                
                                navigate('/');

                            })
                            .catch((reloadError) => {
                                console.error("Error reloading user:", reloadError.message);
                            });
                    })
                    .catch((updateError) => {
                        console.error("Error updating profile:", updateError.message);
                    });
            })
            .catch((registerError) => {
                console.error("Error registering user:", registerError.message);
            });

    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                setUser(res.user);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoURL"
                            name='photo'
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your photo URL"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            <span className={err === 'number' ? 'text-red-600 font-bold' : ''}>Password must contain at least 6 characters</span>, <span className={err === 'upper' ? 'text-red-600 font-bold' : ''}>including uppercase </span > and <span className={err === 'lower' ? 'text-red-600 font-bold' : ''}>lowercase letters.</span>
                        </p>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 mt-4 rounded-md hover:bg-primary-dark focus:outline-none"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={handleGoogleLogin} className="w-full btn btn-outline btn-primary">Register with Google</button>
                    {/* You can replace Google button with GitHub or both */}
                    {/* <button className="w-full btn btn-outline btn-secondary">Login with GitHub</button> */}
                </div>
                {/* Login Link */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
