import React from "react";
import './WeatherCard.css'

const WeatherCard = ({ timeSlot }) => {
  const date = new Date(timeSlot.dt_txt)
  const dateText = date.toLocaleDateString()
  const dateTime = date.toLocaleTimeString()
  const skyState = timeSlot.weather[0].description
  const windSpeed = timeSlot.wind.speed
  console.log(timeSlot)
  return <article>
    <h2 id="date">{dateText}-{dateTime}</h2>
    <p>{skyState}</p>
    <p>Wind speed: {windSpeed}</p>
  </article>;
};

export default WeatherCard;
