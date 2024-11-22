import { useState, useEffect } from "react";
import toggleFavoriteCity from "../functions";
import { URL } from "../constants";
import { useFavorites } from "../context/FavoritesContext";

function WeatherDetailsModal({ selectedItem, closeModal, apiKey }) {

  const { addFavorite, removeFavorite, favorites } = useFavorites();
  console.log(favorites)
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (weatherData) {
      const cityExists = favorites.some(
        (city) =>
          city.name === weatherData.location.name &&
          city.country === weatherData.location.country
      );
      setIsFavorite(cityExists);
    }
  }, [weatherData, favorites]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${URL}current.json?key=${apiKey}&q=${selectedItem.name}&lang=es`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedItem, apiKey]);

  const handleToggleFavorite = () => {
    if (weatherData) {
      const isAlreadyFavorite = favorites.some(
        (city) =>
          city.name === weatherData.location.name &&
          city.country === weatherData.location.country
      );
  
      if (isAlreadyFavorite) {
        // Si ya es favorita, se elimina
        removeFavorite(weatherData.location.name, weatherData.location.country);
        setIsFavorite(false);
      } else {
        // Si no es favorita, se agrega
        addFavorite(weatherData.location);
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <p className="mt-4 text-gray-700">Cargando...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {weatherData?.location.name}, {weatherData?.location.country}
            </h2>
            {/* Resto del contenido del modal */}
            <p className="text-sm text-gray-500 text-center mb-6">
              Zona horaria: {weatherData?.location.tz_id} | Última actualización:{" "}
              {weatherData?.current.last_updated}
            </p>

            <div className="flex items-center justify-center mb-4">
              <img
                src={weatherData?.current.condition.icon}
                alt={weatherData?.current.condition.text}
                className="w-12 h-12"
              />
              <p className="ml-2 text-lg text-gray-700">
                {weatherData?.current.condition.text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Temperatura</p>
                <p className="text-lg font-semibold">
                  {weatherData?.current.temp_c}°C / {weatherData?.current.temp_f}°F
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sensación térmica</p>
                <p className="text-lg font-semibold">
                  {weatherData?.current.feelslike_c}°C /{" "}
                  {weatherData?.current.feelslike_f}°F
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Humedad</p>
                <p className="text-lg font-semibold">{weatherData?.current.humidity}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Presión</p>
                <p className="text-lg font-semibold">
                  {weatherData?.current.pressure_mb} mb
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Viento</p>
                <p className="text-lg font-semibold">
                  {weatherData?.current.wind_kph} km/h ({weatherData?.current.wind_dir})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visibilidad</p>
                <p className="text-lg font-semibold">
                  {weatherData?.current.vis_km} km
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">Hora local</p>
              <p className="text-lg font-semibold">{weatherData?.location.localtime}</p>
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              Cerrar
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`mt-6 w-full px-4 py-2 ${
                isFavorite ? "bg-red-500 hover:bg-red-600 focus:ring-red-300" : "bg-green-500 hover:bg-green-600 focus:ring-green-300"
              } text-white rounded-md shadow  focus:ring-2  focus:outline-none`}
            >
              {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherDetailsModal;
