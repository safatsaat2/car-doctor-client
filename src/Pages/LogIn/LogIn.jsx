import { Link,  useLocation,  useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';


const LogIn = () => {

    const navigate = useNavigate()
    const {signIn} = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'


   const  handleLogin = event =>{
        event.preventDefault()
        const form = event.target;
        const email= form.email.value;
        const pass = form.pass.value;

        signIn(email, pass)
        .then(res => {
            const user = res.user;
            console.log(user);
            
            const loggedUser = {
                email: user.email
            }
            console.log(loggedUser)
            fetch('http://localhost:5000/jwt', {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data =>  {
                console.log('jwt res',data)

                // Warning: Local storage is not the best (second best place)
                localStorage.setItem('car-access-token', data.token);
                navigate(from, {replace: true})

            })
        })
        .catch(err =>{
            console.log(err)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className=" mr-12 w-1/2">

                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='pass' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-warning" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='my-4 text-center '>New to Car Doctors <Link className='text-orange-600 font-bold' to={'/signup'}>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;