import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {TailSpin} from 'react-loader-spinner';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);  // State to store city data
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [offset, setOffset] = useState(0);  // For pagination
  const limit = 20;  // Number of cities to fetch per request
  
  // Function to fetch city data from API
  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=${limit}&start=${offset}`);
      setCities(prevCities => [...prevCities, ...response.data.records.map(record => record.fields)]);
      setOffset(prevOffset => prevOffset + limit);
      setLoading(false);
    } catch (err) {
      setError('Failed to load cities. Please try again.');
      setLoading(false);
    }
  };

  // Infinite Scroll - Check if the user is near the bottom of the page
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight && !loading) {
      fetchCities();
    }
  };

  // Use useEffect to fetch initial data and set up the scroll event listener
  useEffect(() => {
    fetchCities();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col items-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 '>
      <h1 className='text-5xl mb-8'>Cities List</h1>
      {cities.length === 0 && loading && <TailSpin
  visible={true}
  height="50"
  width="50"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th className='p-6 border'>City</th>
            <th className='p-6 border'>Country</th>
            <th className='p-6 border'>Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index}>
              <td className='text-center p-3 border'>
                <Link to={`/weather/${city.name}`}>{city.name}</Link>
              </td>
              <td className='text-center p-3 border'>{city.cou_name_en}</td>
              <td className='text-center p-3 border'>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <TailSpin
  visible={true}
  height="50"
  width="50"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />}
    </div>
  );
};

export default CitiesTable;
