import React, {useCallback, useState} from 'react';
import s from './inputPlus.module.scss';


interface InputPlusPropsType {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusPropsType> = ({onAdd}) => {
    const [inputValue, setInputValue]=useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    },[inputValue]);

    return(

        <div className={s.input_plus}>
            <input
                type='text'
                className={s.input_plus_value}
                value={inputValue}
                onChange={(evt)=>{
                    setInputValue(evt.target.value);
                }}
                onKeyDown={(evt)=>{
                    if(evt.key === 'Enter'){
                        addTask();
                    }
                }}
                placeholder='Type here...'
            />
            <button
                onClick={
                    addTask
                }
                aria-label="Add"
                className={s.input_plus_button}
            />
        </div>
    )
};

