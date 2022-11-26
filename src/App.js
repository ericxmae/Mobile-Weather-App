import React, {useState} from 'react'
import axios from 'axios';

export default function App() {

  const [data , setData] = useState({});
  const [location , setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a7b0cb8ff2b9b1ef96a5e315f522f51e&units=metric`

  const searchLocation = (event) => {

    if(event.key === "Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value = {location}
        onChange={event => setLocation (event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter City"
        type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {
              data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null
            }
            
            
          </div>
          <div className="description">
          {
            data.weather ? <p>{data.weather[0].main}</p> : null  
          }
          </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.main.feels_like.toFixed()}°C</p> 
            <p>Feels Like</p> 

          </div>          
          <div className="humidity">
            <p className="bold">{data.main.humidity.toFixed()}%</p>
            <p>Humidity</p>
          </div>          
          <div className="wind">
            <p className="bold">{data.wind.speed}MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>

      } 

      </div>
    </div>

  );
}