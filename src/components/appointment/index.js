import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const save = (name, interviewer)=>{
    console.log("save");
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointments">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
          <Form 
          interviewers={props.interviewers} 
          cancel={()=> back()} 
          onSave={save} 
          />
      )}
      
      
    </article>
  );
}
