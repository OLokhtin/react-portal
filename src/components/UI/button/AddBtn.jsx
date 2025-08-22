import React from 'react';
import classes from "./AddBtn.module.css";

const AddBtn = ({children, ...props}) => {
    return (
        <button className={classes.addBtn} {...props}>
            {children}
        </button>
    );
};

export default AddBtn;