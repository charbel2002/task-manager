import { useContext, useState,createContext, useMemo } from "react"
import DeleteInterface from "./sub/deleteInterface"
import ModifyInterface from "./sub/modifyInterface"

const idContext = createContext(
    {
        id:{},
        setId:() => {}
    }
)

const deleteInterfaceContext = createContext(
    {
        deleteInterfaceState:false,
        setDeleteInterfaceState:() => {}
    }
)

const modifyInterfaceContext = createContext(
    {
        modifyInterfaceState:false,
        setModifyInterfaceState:() => {}
    }
)

const todosAbstractContext = createContext(
    {
        todos:[],
        setTodos:() => {}
    }
)

export default function Todo(props)
{

    const [modifyInterfaceState,setModifyInterfaceState] = useState(false)

    const [deleteInterfaceState,setDeleteInterfaceState] = useState(false)

    const [todoId,setTodoId] = useState(props.todo.id)

    const {todos,setTodos} = useContext(props.context)

    var forTodoContext = useMemo(() => ({todos,setTodos}),[todos])

    var idMemo = useMemo(() => ({todoId,setTodoId}),[todoId])

    var deleteInterfaceStateMemo = useMemo(() => ({deleteInterfaceState,setDeleteInterfaceState}),[deleteInterfaceState])

    var modifyInterfaceStateMemo = useMemo(() => ({modifyInterfaceState,setModifyInterfaceState}),[modifyInterfaceState])

    const callModifyInterface = (e) => {

        setModifyInterfaceState(true)

    }

    const callDeleteInterface = (e) => {

        setDeleteInterfaceState(true);

    }

    return (
        <>

            {
                deleteInterfaceState == true &&

                <todosAbstractContext.Provider value={forTodoContext}>
                    <deleteInterfaceContext.Provider value={deleteInterfaceStateMemo}>
                        <idContext.Provider value={idMemo}>
                            <DeleteInterface context={idContext} interfaceStateAsProps={deleteInterfaceContext} todoContextAsProps={todosAbstractContext}/>
                        </idContext.Provider>
                    </deleteInterfaceContext.Provider>
                </todosAbstractContext.Provider>
                
            }

            {
                modifyInterfaceState == true &&

                <todosAbstractContext.Provider value={forTodoContext}>
                    <modifyInterfaceContext.Provider value={modifyInterfaceStateMemo}>
                        <idContext.Provider value={idMemo}>
                            <ModifyInterface context={idContext} interfaceStateAsProps={modifyInterfaceContext} todoContextAsProps={todosAbstractContext}/>
                        </idContext.Provider>
                    </modifyInterfaceContext.Provider>
                </todosAbstractContext.Provider>
                
            }
        
            <div className="lg:flex lg:flex-nowrap md:flex-nowrap sm:flex-nowrap flex flex-wrap lg:items-center items-center lg:shadow-lg shadow-lg lg:my-5 my-5 lg:bg-gray-200 bg-gray-200 lg:p-2 p-2 lg:rounded-lg rounded-lg">

                <div className="lg:w-8/12 w-full text-center">
                    {props.todo.label}
                </div>

                <div className="lg:4/12 w-full lg:flex flex lg:items-center items-center lg:justify-around justify-center">

                    <button onClick={callModifyInterface} className="lg:mx-5 mx-5 lg:w-10 w-10 lg:h-10 h-10 lg:bg-blue-600 bg-blue-600 lg:rounded-full rounded-full lg:shadow-2xl shadow-2xl lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>

                    <button onClick={callDeleteInterface} className="lg:mx-5 mx-5 lg:w-10 w-10 lg:h-10 h-10 lg:bg-red-600 bg-red-600 lg:rounded-full rounded-full lg:shadow-2xl shadow-2xl lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>

                </div>

            </div>

        </>
    )

}