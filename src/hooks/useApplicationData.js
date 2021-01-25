import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(daysData),
      Promise.resolve(appointmentData),
      Promise.resolve(interviewsData),
    ]).then((all) => {
      setState((state) => ({
        ...state,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const daysData = axios.get(`http://localhost:8001/api/days`);
  const appointmentData = axios.get(`http://localhost:8001/api/appointments`);
  const interviewsData = axios.get(`http://localhost:8001/api/interviewers`);

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
    return axios.put(`/api/appointments/${id}`, appointment )
    .then(()=>{
      setState(prev=>({
        ...prev,
        appointments
      }))
    })
    .then(()=>{
      return axios.get('/api/days')
      .then((data)=>{
        return setState((prev) => ({
          ...prev,
          days: data.data
        }))
      })
    })
  }
    


  const cancelInterview = (id) =>{
    return axios.delete(`api/appointments/${id}`)
    .then(()=>{
      return setState(prev=>{
        return {...prev}
      })
    })
    .then(()=>{
      return axios.get('/api/days')
      .then((data)=>{
        return setState((prev) => ({
          ...prev,
          days: data.data
        }))
      })
    })
  }


  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };

}


