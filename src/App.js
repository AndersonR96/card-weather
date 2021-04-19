import React, { useEffect, useState } from 'react';

import { KEY, URL, SIN_ESTADO, NUBLADO } from './constants'
import { dataRow } from './components'
import './App.css';
import temIcon from './assets/icons/temp.png'
import humIcon from './assets/icons/humidity.png'
import winIcon from './assets/icons/wind.png'

const kelvinToCentigrade = (kelvin) => kelvin - 273.15

const dateNow = () => new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

function App() {
  const [data, setData] = useState()

  const getData = async () => {
    fetch(URL, {
      headers: {
        Authorization: KEY
      }
    }).then(res => res.json())
      .then(data => setData(data))
  }

  useEffect(() => {
    if (!data) {
      getData()
    }
  }, [data])

  const weatherMain = data?.weather ? NUBLADO : SIN_ESTADO

  return (
    <div className="card">
      <div className="img">
        <div className="card-content">
          <div className="tittle">
            {data?.name || "No hay ciudad seleccionada"}
          </div>
          <div className="date">
            {dateNow()}
          </div>
          <div className="temp">
            {data?.main?.temp && `${kelvinToCentigrade(data?.main?.temp)}°`}
          </div>
        </div>
        <div className="weather">
          <strong>Clima / </strong>{weatherMain}
        </div>
      </div>
      <div className="content">
        {dataRow(<img className="icons" alt="temIcon" src={temIcon} />, "Temperatura", (kelvinToCentigrade(data?.main?.temp) || ""), " °")}
        {dataRow(<img className="icons" alt="humIcon" src={humIcon} />, "Húmedad", data?.main?.humidity, " %")}
        {dataRow(<img className="icons" alt="winIcon" src={winIcon} />, "Velocidad Viento", data?.wind?.speed, " m/s")}
      </div>
    </div>

  );
}

export default App;
