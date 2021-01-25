import React from "react";
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDITING";
  const ERROR_SAVE = "Sorry, something went wrong when SAVING the interview!";
  const ERROR_DELETE = "Sorry, something went wrong when DELETING the interview!";
  

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    return props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const destroy = (id) => {
    transition(DELETING, true);
    return props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const edit = () => transition(EDIT);

  return (
    <article className="appointments">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          cancel={() => back()}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}

      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          cancel={() => back()}
          onConfirm={() => destroy(props.id)}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          editing={true}
          cancel={() => back()}
          onSave={save}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error message={ERROR_DELETE} onClose={() => back(SHOW)} />
      )}

      {mode === ERROR_SAVE && (
        <Error message={ERROR_SAVE} onClose={() => back()} />
      )}
    </article>
  );
}
