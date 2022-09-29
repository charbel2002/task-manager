import { Link, Navigate } from "react-router-dom"
import "../styles/login.css"
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

    export default function Login()
    {

        const form = useRef();

        const [users, setUsers] = useState([]);

        const usersCollection = collection(db,'users');

        let navigate = useNavigate();

        useEffect(() => {

            if(localStorage.getItem('log'))
            {
                navigate('/account')
            }

            const fetchUsers = async () => {

                let data = await getDocs(usersCollection);

                setUsers(data.docs.map(doc => ({...doc.data(),id:doc.id})));

            }

            fetchUsers();
            

        },[])

        const authenticate = async (e) => {

            e.preventDefault();

            let formValidated = await validateForm()

            if(formValidated)
            {

                /*
                
                    -Authenticate the user
                    -Render response
                    -If authenticated then store session info in the browser
                
                */

                //get the table field that contain the user email

                let user = await getUser(form.current.email.value);

                if(user.status == 'found')
                {

                    if(user.data.password == form.current.password.value)
                    {
                        toast.success('Authenticated');

                        //then set connexion info in the browser and redirect to account

                        await connexion(user)
                        .then(() => navigate('/account'))

                    }
                    else{
                        toast.warning('Incorrect password');
                    }

                }
                else{
                    toast.warning('Bad credentials');
                }

            }

        }

        const connexion = (user) => {

            return new Promise((resolve,reject) => {

                localStorage.setItem('log',JSON.stringify(user.data));

                resolve(true);

            })

        }

        const getUser = (email) => {

            return new Promise((resolve,reject) => {

                var data = {
                    status:'nfound',
                    data:{}
                }

                users.forEach(user => {

                    if(user.email == email)
                    {
                        data = {
                            status:'found',
                            data:user
                        }
                    }

                })

                resolve(data);

            })

        }

        const emailCheck = (email) => {

            return new Promise((resolve,reject) => {

                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
                {
                    resolve(true)
                }
                else{
                    resolve(false)
                }

            })

        }

        const validateForm = () => {

            return new Promise(async (resolve,reject) => {

             var count = 0;

                for(const [index,field] of Object.entries(form.current))
                {

                    /*
                    
                        -Check emptyness
                        -Check email format
                    
                    */

                    if(field.value != 'undefined' && field.name != 'undefined' && field.placeholder)
                    {
                        
                        if(field.value === "" || field.value === " " || field.value === null)
                        {
                            toast.error(`Field ${field.name} is empty`)
                            count++;
                        }
                        else{
                            if(field.name == 'email')
                            {

                                let emailChecked = await emailCheck(field.value);

                                if(!emailChecked){
                                    toast.error('Invalid email')
                                    count++;
                                }

                            }
                        }

                    }

                }

                if(count > 0)
                {
                    resolve(false);
                }
                else{
                    resolve(true);
                }

            })

        }

        return (
            <>
            
            <section id="app-login" className="lg:h-screen h-screen lg:flex flex lg:items-center items-center lg:justify-center justify-center lg:flex-col flex-col overflow-auto">

                <Link to="/" className="lg:bg-blue-800 bg-blue-800 lg:text-white text-white lg:font-extrabold font-extrabold lg:w-10 w-10 lg:h-10 h-10 lg:flex flex lg:items-center items-center lg:justify-center justify-center lg:fixed fixed lg:top-0 top-0 lg:left-0 left-0 lg:rotate-180 rotate-180">&rarr;</Link>

                <div className="lg:bg-white bg-white lg:p-4 p-4 lg:rounded-full rounded-full lg:shadow-xl shadow-xl">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>


                </div>

                <div className="lg:w-full w-full lg:my-5 my-5">

                    <form ref={form} onSubmit={authenticate} className="lg:w-5/12 w-11/12 md:w-7/12 sm:w-8/12 lg:mx-auto mx-auto lg:p-3 p-3 lg:bg-white bg-white lg:shadow-xl shadow-xl lg:rounded-lg rounded-lg lg:text-center text-center">

                        <header className="lg:font-extrabold font-extrabold lg:text-xl text-xl lg:mb-5 mb-5">Login form</header>

                        <div className="lg:mb-5 mb-5 lg:w-10/12 w-11/12 lg:mx-auto mx-auto">
                            <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="text" name="email" placeholder="Your email goes here" />
                        </div>

                        <div className="lg:mb-5 mb-5 lg:w-10/12 w-11/12 lg:mx-auto mx-auto">
                            <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="password" name="password" placeholder="Your password goes here" />
                        </div>

                        <div className="lg:mb-5 mb-5">
                            <button type="submit" className="lg:bg-blue-800 bg-blue-800 lg:text-white text-white lg:font-extrabold font-extrabold lg:rounded-md rounded-md lg:p-2 p-2 lg:w-4/12 w-6/12">Login</button>
                        </div>

                        <div className="lg:mb-5 mb-5">
                            <Link to="/signup" className="lg:text-sm text-sm lg:text-blue-700 text-blue-700 lg:underline underline">No account ? Create yours here</Link>
                        </div>

                        <ToastContainer />

                    </form>

                </div>

                <div className="lg:mt-5 mt-5 lg:text-sm text-sm lg:text-gray-700 :text-gray-700">
                    &copy; Your task manager
                </div>

            </section>
            
            </>
        )
    }