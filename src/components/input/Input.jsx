import React from 'react';
import classes from './Input.css'

const Input = (props) => {
    return (
        <input className={classes.myInput} {...props}/>
    );
};

export default Input;