import React from "react";
import "./weatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { useState } from "react";

const WeatherApp = () => {
  const [icon, setIcon] = useState(cloud_icon);
  const apikey = process.env.REACT_APP_API_KEY;
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${apikey}`;
    let responce = await fetch(url);
    let data = await responce.json();
    const humidity = document.getElementsByClassName("humidityPercent");
    const wind = document.getElementsByClassName("windSpeed");
    const temperature = document.getElementsByClassName("weatherTemp");
    const location = document.getElementsByClassName("weatherLocation");
    humidity[0].innerHTML = Math.floor(data.main.humidity) + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " MPH";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°F";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setIcon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setIcon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setIcon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setIcon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setIcon(snow_icon);
    } else {
      setIcon(clear_icon);
    }
  };

  return (
    <div className="weatherApp">
      <div className="container">
        <div className="topBar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div
            className="searchIcon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="search" />
          </div>
        </div>
        <div className="weatherImage">
          <img src={icon} alt="cloud" />
        </div>
        <div className="weatherTemp">--</div>
        <div className="weatherLocation">Location</div>
        <div className="dataContainer">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidityPercent">---</div>
              <div className="text">Humidty</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="windSpeed">---</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
