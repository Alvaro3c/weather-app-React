import React, { useState, useEffect } from "react";
import WeatherCard from './WeatherCard/WeatherCard'
import './WeatherList.css'

//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} //devuelve datos de tiempo en funcion de lat y long

const WeatherList = () => {
  const [city, setCity] = useState('Madrid')
  const [search, setSearch] = useState('')
  const [forecast, setForecast] = useState([]);

  const onInputChanged = (e) => {
    setSearch(e.target.value);
  }

  const getWeatherInfo = async (lat, lon) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=af89a2e47b352bf154f8ef5e11e676c2`)
      const data = await response.json()
      setForecast(data.list)
    } catch (error) {
      console.log(error)
    }
  }

  const onSearch = (e) => {
    e.preventDefault()
    setCity(search)
  }

  useEffect(() => {
    const getCoordinates = async (cityName) => {
      try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=af89a2e47b352bf154f8ef5e11e676c2`)
        const data = await response.json()
        const lat = data[0].lat
        const lon = data[0].lon
        getWeatherInfo(lat, lon)
      } catch (error) {
        console.log(error);
      }
    }

    getCoordinates(city)
  }, [city])

  return <>
    <header>
      <h1>Weather info in {city}</h1>
      <form action="">
        <input type="text" value={search} placeholder="Write down a city" onChange={onInputChanged} />
        <button onClick={onSearch}>Search</button>
      </form>
    </header>
    <section>
      {forecast.length ? forecast.map((timeSlot) => <WeatherCard key={timeSlot.dt_txt} timeSlot={timeSlot} />) : null}
    </section>
  </>


};

export default WeatherList;
