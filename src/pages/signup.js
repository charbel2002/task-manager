import "../styles/register.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../firebase-config";
import { collection, addDoc,getDocs } from "firebase/firestore"

    export default function Signup()
    {

        const form = useRef();

        const usersCollection = collection(db,'users');

        const navigate = useNavigate()

        const [users,setUsers] = useState([])

        const [state,setState] = useState(false);

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

        })

        const createUser = async () => {

            await addDoc(
                usersCollection,
                {
                    name:form.current.cname.value,
                    email:form.current.email.value,
                    password:form.current.password.value
                }
            )

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

        const submit = async (e) => {

            e.preventDefault();

            let validated = await validator(form);

            if(validated)
            {

                const id = toast.loading("Processing...");

                let emailValidated = await emailCheck(form.current.email.value);

                if(emailValidated)
                {
                    //then we process to registering

                    let res = await getUser(form.current.email.value)

                    if(res.status == 'found')
                    {

                        toast.update(id, {render: "Email already taken", type: "error", isLoading: false})

                        setTimeout(() => {
                            toast.dismiss()
                            setState(true)
                        },1000)

                    }
                    else{
                        await createUser()
                        .then(() => {
                            toast.update(id, {render: "Account created", type: "success", isLoading: false})
                            
                            setTimeout(() => {
                                toast.dismiss()
                                setState(true)
                                navigate('/signin')
                            },500)
                        })
                    }

                }
                else{
                    toast.error('Invalid email address')
                }

            }

        }

        const validator = async (form) => {

            return new Promise((resolve,reject) => {

                let count = 0;

                for(const [index,field] of Object.entries(form.current))
                {
                    if(field.value != 'undefined' && field.name != 'undefined' && field.placeholder)
                    {
                        if(field.value === "" || field.value === " " || field.value === null)
                        {
                            toast.error(`Field ${field.name} is empty`)
                            count++;
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

        return (
            <>
            
                <section id="app-register" className="lg:h-screen h-screen lg:flex flex lg:items-center items-center lg:justify-center justify-center lg:flex-col flex-col overflow-auto">

                    <Link to="/" className="lg:bg-blue-800 bg-blue-800 lg:text-white text-white lg:font-extrabold font-extrabold lg:w-10 w-10 lg:h-10 h-10 lg:flex flex lg:items-center items-center lg:justify-center justify-center lg:fixed fixed lg:top-0 top-0 lg:left-0 left-0 lg:rotate-180 rotate-180">&rarr;</Link>

                    <div className="lg:bg-white bg-white lg:p-4 p-4 lg:rounded-full rounded-full lg:shadow-xl shadow-xl">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>

                    </div>

                    <div className="lg:w-full w-full lg:my-5 my-5">

                        <form ref={form} onSubmit={submit} className="lg:w-5/12 w-11/12 md:w-8/12 sm:w-10/12 lg:mx-auto mx-auto lg:p-3 p-3 lg:bg-white bg-white lg:shadow-xl shadow-xl lg:rounded-lg rounded-lg lg:text-center text-center">

                            <header className="lg:font-extrabold font-extrabold lg:text-xl text-xl lg:mb-5 mb-5">Register form</header>

                            <div className="lg:mb-2 mb-2 lg:w-11/12 w-10/12 lg:mx-auto mx-auto">
                                <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="text" name="cname" placeholder="Your name goes here" />
                            </div>

                            <div className="lg:mb-2 mb-2 lg:w-11/12 w-10/12 lg:mx-auto mx-auto">
                                <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="text" name="email" placeholder="Your email goes here" />
                            </div>

                            <div className="lg:mb-2 mb-2 lg:w-11/12 w-10/12 lg:mx-auto mx-auto">
                                <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="password" name="password" placeholder="Your password goes here" />
                            </div>

                            <div className="lg:mb-2 mb-2 lg:w-11/12 w-10/12 lg:mx-auto mx-auto">
                                <input autoComplete="off" className="lg:p-2 p-2 lg:bg-gray-200 bg-gray-200 lg:w-full w-full lg:rounded-md rounded-md focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" type="password" name="confirm" placeholder="Confirm your password" />
                            </div>

                            <div className="lg:mb-5 mb-5">
                                <button type="submit" className="lg:bg-blue-800 bg-blue-800 lg:text-white text-white lg:font-extrabold font-extrabold lg:rounded-md rounded-md lg:p-2 p-2 lg:w-4/12 w-4/12">Send</button>
                            </div>

                            <div className="lg:mb-5 mb-5">
                                <Link to="/signin" className="lg:text-sm text-sm lg:text-blue-700 text-blue-700 underline lg:underline">Already registered ? login here</Link>
                            </div>

                        </form>

                        <ToastContainer />

                    </div>

                    <div className="lg:mt-5 mt-5 lg:text-sm text-sm lg:text-gray-700 text-gray-700">
                        &copy; Your task manager
                    </div>

                </section>
            
            </>
        )
    }