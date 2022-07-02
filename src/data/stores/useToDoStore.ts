import create, {State, StateCreator} from "zustand";
import {generateId} from "../helpers";
import {devtools} from "zustand/middleware";

interface Task{
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore{
    tasks: Task[],
    createdTask:(title: string)=> void;
    updateTask: (id: string, title: string)=> void;
    removeTask: (id: string) => void;
}

function isToDoStore (object: any): object is ToDoStore{
    return 'tasks' in object;
}

const localStorageDate = <T extends State>(config:StateCreator<T>): StateCreator<T> =>
    (set, get, api)=> config((nextState, ...args)=>{
        if(isToDoStore(nextState)){
            window.localStorage.setItem('tasks', JSON.stringify(
                nextState.tasks
            ));
        }
        set(nextState, ...args);
    }, get, api);

const getCurrentState = () =>{
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState;
    } catch(err){
        window.localStorage.setItem('tasks', '[]');
    }
    return [];
}

export const useToDoStore=create<ToDoStore>(localStorageDate(devtools((set, get) =>({
    tasks: getCurrentState(),
    createdTask: (title)=>{
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title: title,
            createdAt: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id:string, title:string)=>{
        const { tasks } = get();
        set({
            tasks: tasks.map((tasks)=>({
                ...tasks,
                title: tasks.id === id? title: tasks.title,
            }))
        })
    },
    removeTask: (id:string)=>{
        const { tasks } = get();
        set({
            tasks: tasks.filter((tasks)=>tasks.id !== id)
        })
    }
}))))