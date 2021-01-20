import React from "react";
import "components/InterviewListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
    
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  // const imgClass = classNames("interviewers__item-image", {
  //   "interviewers__item--selected": props.selected,
  // });

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

// const ListNames = classnames("interviewers__item",
// {"interviewers__item--selected": props.selected});
// const ImgNames = classnames("interviewers__item-image",
// {"interviewers__item--selected-image": props.selected});
// return(
//   <li className={ListNames} onClick={props.setInterviewer}>
//     <img className={ImgNames} src={props.avatar} alt={props.name}></img>
//     {props.selected && props.name}
//   </li>
// )