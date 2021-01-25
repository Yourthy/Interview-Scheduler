
export const getAppointmentsForDay = (state, day) => {
    let appointmentsByDay = [];
    state.days.forEach((dayofWeek)=>{
        //if the day's name matches day
        if(dayofWeek.name === day){
            dayofWeek.appointments.forEach((appt)=>{
                appointmentsByDay.push(state.appointments[appt]);
            })
        }
    })
    return appointmentsByDay.length ? appointmentsByDay : [];
}


export const getInterview = (state, interview) => {

    if (interview) {
      let interviewer = state.interviewers[interview.interviewer];
      return {...interview, interviewer}; 
    } else {
  
      return null;
  
    }
  };

  export const getInterviewersForDay = (state, day) => {
    let interviewersByDay = [];
    state.days.forEach((dayofWeek)=>{
     
        //if the day's name matches day
        if(dayofWeek.name === day){
            dayofWeek.appointments.forEach((interviewID)=>{
                interviewersByDay.push(state.interviewers[interviewID]);
            })
        }
    })
   
    return interviewersByDay.length ? interviewersByDay : [];
  
}

