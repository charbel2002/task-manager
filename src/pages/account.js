import { createContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import AddTask from "../components/addTask";
import "../styles/account.css"
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Todo from "../components/todo";

const userContext = createContext(
    {
        user:{},
        setUser:() => {}
    }
);

const todoContext = createContext(
    {
        todos:{},
        setTodos:() => {}
    }
)

export default function Account()
{

    const [user,setUser] = useState({});

    const [todos,setTodos] = useState([]);

    const todoCollection = collection(db,'todos')

    const navigate = useNavigate();

    const forContext = useMemo(() => ({user,setUser}),[user])

    const forTodoContext = useMemo(() => ({todos,setTodos}),[todos]);

    const setAppUserState = () => {

        return new Promise((resolve,reject) => {

            if(localStorage.getItem('log'))
            {

                let data = JSON.parse(localStorage.getItem('log'))
                
                setUser(data);
                
                resolve(true);

            }
            else{
                navigate('/signin')
            }

        })

    }

    const logout = () => {

        localStorage.removeItem('log')

        navigate('/signin')

    }

    const fetchTodos = async () => {

        let data = await getDocs(todoCollection);

        setTodos(data.docs.map(doc => ({...doc.data(),id:doc.id})))

    }

    useEffect(() => {

        /*
        
            -Async function to set the user data
            -Then base on user data ;  fetch todos
        
        */

        (async () => {
            await setAppUserState()
            .then(async res => {

                if(res)
                {
                    await fetchTodos();
                }

            })
        })()

    },[])

    return (
        <>
        
            <section id="app-account" className="lg:h-screen h-screen lg:mb-20 mb-20">

                <div className="lg:bg-white bg-white lg:shadow-xl shadow-xl lg:flex flex flex-wrap lg:sticky sticky lg:top-0 top-0">
                    
                    <div className="lg:bg-blue-700 bg-blue-700 lg:text-white text-white p-3 lg:font-extrabold font-extrabold lg:text-center text-center lg:p-3 lg:w-2/12 w-full lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        Welcome {user.name}
                    </div>

                    <div className="lg:text-center text-center lg:w-8/12 w-8/12 lg:p-3 p-3 lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        Your task manager
                    </div>

                    <div className="lg:w-2/12 w-4/12 lg:text-center ext-center lg:p-3 p-3 lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        <button onClick={logout} className="lg:bg-gray-400 bg-gray-400 lg:p-1 p-1 lg:rounded-full rounded-full lg:cursor-pointer cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>

                </div>

                <article id="tasks" className="lg:bg-white bg-white lg:shadow-2xl shadow-2xl lg:w-6/12 w-10/12 lg:mx-auto mx-auto lg:mt-32 mt-32 lg:rounded-lg rounded-lg lg:p-3 p-3">

                    {todos.filter(todo => todo.user_id == user.id).length > 0 &&
                    
                    todos.filter(todo => todo.user_id == user.id)
                    .map(todo => 
                        
                            <todoContext.Provider value={forTodoContext}>
                                <Todo todo={todo} context={todoContext}/>
                            </todoContext.Provider>
                        
                        )
                    
                    }

                    {todos.filter(todo => todo.user_id == user.id).length == 0 &&
                        
                        <div className="lg:bg-gray-300 bg-gray-300 lg:p-3 p-3 lg:rounded-lg rounded-lg lg:flex flex lg:items-center items-center lg:justify-center justify-center">

                            <span className="lg:mr-5 mr-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </span>

                            <span className="text-sm">No task for the moment</span>

                        </div>
                    
                    }

                </article>

                <userContext.Provider value={forContext}>
                    <todoContext.Provider value={forTodoContext}>
                        <AddTask context={userContext} todoContextAsProps={todoContext}/>
                    </todoContext.Provider>
                </userContext.Provider>

            </section>
        
        </>
    )
}