import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function CardList({ city }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const URL = import.meta.env.VITE_API_URL;
  const { favorites } = useFavorites();
  console.log(favorites)
  const [cities, setCities] = useState()
  useEffect(() => {
    if (favorites.length === 0) return;

    // Crear el body de la petición
    const requestBody = {
      locations: favorites.map((item, index) => ({
        q: item.name,
        custom_id: `custom-id-${index + 1}`, // Puedes personalizar este id
      })),
    };

    // Realizar la petición
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${URL}current.json?key=${apiKey}&q=bulk&lang=es`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        setCities(data.bulk);
        // console.log('Response:', data);
        // console.log("Datos enviados con éxito:", await response.json());
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    };

    sendRequest();
  }, [favorites]);

  // console.log(location, current)

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cities?.map((city, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(city)}
          // className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer transform hover:scale-105"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {city.query.location.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {city.query.location.region}, {city.query.location.country}
          </p>

          <div className="flex items-center space-x-3 mb-4">
            <img
              src={`https:${city.query.current.condition.icon}`}
              alt={city.query.current.condition.text}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {city.query.current.condition.text}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {city.query.current.temp_c}°C
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-300 flex items-center">
              {city.query.current.is_day ? "Day" : "Night"}
              {city.query.current.is_day ? (
                <SunIcon className="w-8 h-8 text-yellow-500 ml-5" />
              ) : (
                <MoonIcon className="w-8 h-8 text-gray-500 ml-5" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
