import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment (props){ 
    console.log("props index", props);
return(
    <article className="appointments">
        <Header
            time={props.time}
        />
        {props.interview ? 
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        /> : <Empty />}
    </article>
    )

}