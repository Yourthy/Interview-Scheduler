import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.js";
import Appointment from "components/appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
// import { get } from "http";



export default function Application(props) {

 
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
    });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({ ...state, days});
  
  const daysData = axios.get(`http://localhost:8001/api/days`);
  const appointmentData = axios.get(`http://localhost:8001/api/appointments`);
  const interviewsData = axios.get(`http://localhost:8001/api/interviewers`);


  useEffect(()=>{
    
  Promise.all([
    Promise.resolve(daysData),
    Promise.resolve(appointmentData),
    Promise.resolve(interviewsData),
  ]).then((all) => {
    setState(state => ({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
  },[]);


  const bookInterview = (id, interview) => {
    console.log("bookInterview triggered");
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });
    axios.put("http://localhost:8001/api/appointments/:id", (req, res)=>{
      console.log(res.status);
    });
   
  };
  
  
 

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => { 
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day)
  


  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">

      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList 
      days={state.days} 
      setDay={setDay} 
      day={state.day}/>
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {schedule}
      </section>
    </main>
  );
 
}
