import React, {useEffect, useRef, useState} from 'react';
import s from './InputTask.module.scss';


interface InputTaskPropsType {
    id: string
    title: string
    onDane: (id:string) => void
    onEdite: (id: string, title: string) => void
    onRemoved: (id: string) => void
}

export const InputTask: React.FC<InputTaskPropsType> = ({id, onEdite, title, onDane, onRemoved}) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(isEditMode){
            editTitleInputRef?.current?.focus();
        }
    }), [isEditMode]

    return(
        <div className={s.input_task}>
            <label className={s.input_task_label}>
                <input
                    type='checkbox'
                    checked={checked}
                    disabled={isEditMode}
                    className={s.input_task_label_check}
                    onChange={(e)=>{
                        setChecked(e.target.checked)
                        if(e.target.checked){
                            setTimeout(()=>{
                                onDane(id);
                            }, 300)
                        }
                    }}
                />
                { isEditMode? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(e)=> setValue(e.target.value)}
                        className={s.input_task_label_edit}
                    />
                ): <h3 className={s.input_task_label_title}>{title}</h3>}
            </label>
            {isEditMode?(
                <button
                    aria-label="Save"
                    className={s.input_task_save}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            onEdite(id, value);
                            setIsEditMode(false);
                        }
                    }}
                    onClick={()=>{
                        onEdite(id, value);
                        setIsEditMode(false);
                    }}
                />
            ):<button
                aria-label="Edit"
                className={s.input_task_edit}
                onClick={()=>{
                    setIsEditMode(true);
                }}
            />
            }
            <button
                aria-label="Remove"
                className={s.input_task_remove}
                onClick={()=>{
                    if(confirm('Are you sure?')){
                        onRemoved(id);
                    }
                }}
            />
        </div>
    )
}
