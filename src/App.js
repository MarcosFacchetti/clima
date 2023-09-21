import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=es&units=metric&appid=11d63ae3d1e6aa03b32cedcc74b4735c`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null); // Limpiar cualquier error previo
        console.log(response.data);
      } catch (err) {
        setData({}); // Limpiar datos en caso de error
        setError("No se encontró la ubicación. Intente nuevamente."); // Configurar el mensaje de error
        console.error("Error al obtener datos:", err);
      }
      setLocation("");
    }
  };

  const weatherDescriptions = {
    Clear: "Despejado",
    Clouds: "Nublado",
    // Agrega más descripciones según sea necesario
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="El tiempo en..."
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>
              {data.name} {data.sys ? data.sys.country : ""}
            </p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p>{weatherDescriptions[data.weather[0].main]}</p>
            ) : null}
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}ºC</p>
              ) : null}
              <p>Sensación</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} km/h</p>
              ) : null}
              <p>Viento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
