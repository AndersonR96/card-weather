import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { dataRow } from "./components";
import temIcon from './assets/icons/temp.png'
import humIcon from './assets/icons/humidity.png'
import winIcon from './assets/icons/wind.png'

function App() {
  const [data, setData] = useState({
    name: "Cali",
    main: { temp: 302.15, humidity: 65},
    weather: "Nublado",
    wind: { speed: 2.7 }
  });
  const dateNow = () =>
    new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const kelvinToCentigrade = (kelvin) => kelvin - 273.15;
  // const weatherMain = data?.weather ? NUBLADO : SIN_ESTADO
  const weatherMain = data?.weather ? "Nublado" : "Sin Estado";

  return (
    <div className="card">
      <div className="img">
        <div className="card-content">
          <div className="tittle">
            {data?.name || "No hay ciudad seleccionada"}
          </div>
          <div className="date">{dateNow()}</div>
          <div className="temp">
            {data?.main?.temp && `${kelvinToCentigrade(data?.main?.temp)}°`}
          </div>
        </div>
        <div className="weather">
          <strong>Clima / </strong>
          {weatherMain}
        </div>
      </div>
      <div className="content">
        {dataRow(
          <img className="icons" alt="temIcon" src={temIcon} />,
          "Temperatura",
          kelvinToCentigrade(data?.main?.temp) || "",
          " °"
        )}
        {dataRow(
          <img className="icons" alt="humIcon" src={humIcon} />,
          "Húmedad",
          data?.main?.humidity,
          " %"
        )}
        {dataRow(
          <img className="icons" alt="winIcon" src={winIcon} />,
          "Velocidad Viento",
          data?.wind?.speed,
          " m/s"
        )}
      </div>
    </div>
  );
}

export default App;
