import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import clearWeatherIcon from '../../assets/clearWeatherIcon.avif'
import drizzleIcon from '../../assets/drizzleIcon.jpg'
import rainnyIcon from '../../assets/rainnyIcon.avif'
import snowIcon from '../../assets/snowIcon.avif'
import cloudIcon from '../../assets/cloudIcon.jpg'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";


const CityWeather = () => {
  const weatherIconMap = {
    '01d':clearWeatherIcon,
    '01n':clearWeatherIcon,
    '02d':cloudIcon,
    '02n':cloudIcon,
    '03d':drizzleIcon,
    '03n':drizzleIcon,
    '04d':drizzleIcon,
    '04n':drizzleIcon,
    '09d':rainnyIcon,
    '09n':rainnyIcon,
    '10d':rainnyIcon,
    '10n':rainnyIcon,
    '13d':snowIcon,
    '13n':snowIcon
  }
  
  const { cityName } = useParams();
  const [icon,setIcon] = useState(snowIcon)
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '68dcee01a6dbbc7999f34f9ecebd3fd6';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=Metric`);
        setWeather(response.data);
        const weatherIcon = response.data.weather[0].icon
        setIcon(weatherIconMap[weatherIcon] || clearWeatherIcon)
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data.');
        setLoading(false);
      }
    };
    fetchWeather();
  }, [cityName]);

  if (loading) return <TailSpin
  visible={true}
  height="80"
  width="80"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
  if (error) return <div className='flex justify-center items-center h-full'>
    <p className='text-center text-3xl'>{error}</p>
    </div>;

  return (
  <div className='flex justify-center items-center bg-sky-300'>
    <div className='h-screen flex flex-col justify-center items-center w-80 rounded-lg border-2 border-pink-400 border-solid'>
      <div className='mb-2 text-center'>
        <img src={icon} className='w-56 h-56'/>
      </div>
      <p className='text-3xl mb-7'>{weather.main.temp}°C</p>
      <p className='text-2xl uppercase text-pink-600 mb-5'>{cityName}</p>
      <p className='text-lg uppercase mb-5'>{weather.sys.country}</p>
      <div className='flex mb-5'>
      <div className='flex flex-col items-center pr-10'>
        <span>latitude</span>
        <span>{weather.coord.lat}</span>
      </div>
      <div className='flex flex-col items-center'>
        <span>longitude</span>
        <span>{weather.coord.lon}</span>
      </div>
      </div>
      <div className='flex justify-around'>
        <div className='flex flex-col items-center pr-32'>
            <span><WiHumidity /></span>
            <span> {weather.main.humidity}%</span>
            <span>Humidity</span>
        </div>
        <div className='flex flex-col items-center'>
            <span><FaWind /></span>
            <span>{weather.wind.speed} m/s</span>
            <span>Wind Speed</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CityWeather;
