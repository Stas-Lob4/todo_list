import React from "react";
import  s from './index.module.scss'
import {useToDoStore} from "../../data/stores/useToDoStore";
import {InputPlus} from "../component/inputPlus/InputPlus";
import {InputTask} from "../component/inputTask/InputTask";

export const App: React.FC = () =>{
    console.log(useToDoStore)
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createdTask,
        state.updateTask,
        state.removeTask
    ])

    console.log(tasks);

    return(
    <div className={s.article}>
        <h1 className={s.article_title}>To Do App</h1>
        <div className={s.article_section}>
            <InputPlus
                onAdd={(title)=>{
                    if(title){
                        createTask(title)
                    }
                }}
            />
        </div>
        <div className={s.article_section}>
            {!tasks.length && (
                <p className={s.article_text}>The is no one task.</p>
            )}
            {tasks.map((tasks) => (
                <InputTask key={tasks.id}
                          id={tasks.id}
                          title={tasks.title}
                          onDane={removeTask}
                          onEdite={updateTask}
                          onRemoved={removeTask}
               />
            ))}
        </div>
    </div>
    );
}