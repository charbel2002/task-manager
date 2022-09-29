import { db } from "../../firebase-config"
import { collection, doc, updateDoc,getDocs } from "firebase/firestore"
import { useContext, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

export default function ModifyInterface(props)
{

    const {modifyInterfaceState,setModifyInterfaceState} = useContext(props.interfaceStateAsProps)

    const todoCollection = collection(db,'todos')

    const [label,setLabel] = useState("")

    const {todoId,setTodoId} = useContext(props.context)

    const {todos,setTodos} = useContext(props.todoContextAsProps)

    const hideInterface = (e) => {

        if(e.target.matches('#modify-interface'))
        {
            setModifyInterfaceState(false)
        }

    }

    const cancel = () => {
        setModifyInterfaceState(false)
    }

    const fetchTodos = async () => {

        let data = await getDocs(todoCollection);

        setTodos(data.docs.map(doc => ({...doc.data(),id:doc.id})))

    }

    const update = async (e) =>{

        e.preventDefault();

        await validateForm()
        .then(async res => {

            const id = toast.loading("Processing...");

            if(res)
            {

                let userDoc = doc(db,'todos',todoId)
                let newFields = {label:label}
                await updateDoc(userDoc,newFields)
                .then(async () => {

                    toast.update(id, {render: "Task updated", type: "success", isLoading: false});

                    /*
                    
                        -Call fetch todos in order to update the todos state
                    
                    */

                    await fetchTodos()
                    .then(() => setModifyInterfaceState(false))

                })
                .catch(err => toast.update(id, {render: "Some error occure", type: "warning", isLoading: false}))

            }
            else{
                toast.warning('Label is empty')
            }

        })

    }

    const validateForm = () => {

        return new Promise((resolve,reject) => {

            if(label == "" || label == " " || label == null)
            {
                resolve(false)
            }
            else{
                resolve(true)
            }

        })

    }

    return (

        <>
        
            <section id="modify-interface" onClick={hideInterface} className="lg:fixed fixed lg:top-0 top-0 lg:left-0 left-0 lg:right-0 right-0 lg:bottom-0 bottom-0 lg:bg-slate-900 bg-slate-900 lg:bg-opacity-70 bg-opacity-70 lg:flex flex lg:items-center items-center lg:justify-center justify-center">

                <article className="lg:w-6/12 w-10/12 lg:bg-white bg-white lg:h-48 h-48 lg:rounded-sm rounded-sm lg:relative relative">

                    <header className="lg:text-xl text-xl lg:font-extrabold font-extrabold lg:p-3 p-3 lg:text-center text-center">
                        Update the task
                    </header>

                    <form onSubmit={update} className="text-center">

                        <div className="">
                            <input type="text" onInput={(e) => setLabel(e.target.value)} placeholder="Updated label" className="lg:block block lg:w-11/12 w-11/12 lg:bg-gray-300 bg-gray-300 lg:mx-auto mx-auto lg:rounded-lg rounded-lg lg:p-3 p-3 focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" name="label"/>
                        </div>

                        <div className="lg:my-3 my-3">

                            <button type="submit" className="lg:bg-blue-700 bg-blue-700 lg:text-white text-white lg:p-2 p-2 lg:rounded-md rounded-md lg:mr-5 mr-5">
                                Update
                            </button>

                            <button onClick={cancel} className="lg:bg-red-700 bg-red-700 lg:text-white text-white lg:p-2 p-2 lg:rounded-md rounded-md lg:mr-5 mr-5">
                                Cancel
                            </button>

                        </div>

                    </form>

                    <ToastContainer/>

                </article>

            </section>
        
        </>

    )

}