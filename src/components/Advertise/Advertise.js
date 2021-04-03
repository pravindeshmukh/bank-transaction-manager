import React from 'react';

import classes from './Advertise.css';

const Advertise = (props) => (
    <article className={classes.Advertise} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Description}>
            <div >{props.description}</div>
        </div>
       <div className={classes.Location}>
            <div className={classes.location}> {props.location ? <span> Location : {props.location} </span>: null}</div>
        </div> 

        <div className={classes.Description}>
            <div className={classes.CreatedBy}>By : {props.createdBy}</div>
        </div>
    </article>
);

export default Advertise;