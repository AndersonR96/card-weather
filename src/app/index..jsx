import { useEffect, useState } from "react";
import WeatherDetailsModal from "./components/WeatherDetailsModal";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-center text-2xl">Weather App</h1>
      </header>
      <main className={`p-4`}>
        <ThemeSelector />
        <LocationSearch theme={theme} />
      </main>
    </div>
  );
}

const LocationSearch = ({ theme }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [cities, setCities] = useState([]);
  console.log(favoriteCities);
  console.log(cities);

  const fetchLocations = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}`
      );
      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLocations(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const openModal = (item) => {
    setQuery(item.name);
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem("");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    setErrorMessage("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm.trim().length < 3) {
      setErrorMessage(
        "El término de búsqueda debe tener al menos 3 caracteres."
      );
      console.warn("El término de búsqueda debe tener al menos 3 caracteres.");
      return; // Detener la ejecución si no cumple la condición
    }

    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}&lang=es`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Imprime "Cali"
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Término de búsqueda:", searchTerm);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCities");
    if (storedFavorites) {
      setFavoriteCities(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favoriteCities.length === 0) return;

    // Crear el body de la petición
    const requestBody = {
      locations: favoriteCities.map((city, index) => ({
        q: city.city,
        custom_id: `custom-id-${index + 1}`, // Puedes personalizar este id
      })),
    };

    // Realizar la petición
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=bulk&lang=es`,
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
  }, [favoriteCities]);

  const handleCardClick = (city) => {
    console.log("Clicked city:", city);
    // Aquí puedes agregar lógica, como mostrar detalles del clima para esta ciudad
  };

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative">
          {/* Input de búsqueda */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca una ciudad..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botón para limpiar */}
          {query && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          )}
        </div>

        {/* Dropdown de resultados */}
        {loading && (
          <div className="absolute w-full p-2 bg-white shadow-md">
            Cargando...
          </div>
        )}
        {results.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1">
            {results.map((location) => (
              <li
                key={location.id || location.name}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => openModal(location)} // Opcional: completa el input al seleccionar
              >
                {location.name}, {location.region}, {location.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      {/* Tarjetas de ciudades favoritas */}
      {/* "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((city, index) => (
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
                {city.query.current.is_day ? "Day" : "Night" }
                {city.query.current.is_day ? <SunIcon className="w-8 h-8 text-yellow-500 solid ml-5" /> : <MoonIcon className="w-8 h-8 text-gray-500 solid" /> }
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isOpen && (
        <WeatherDetailsModal
          selectedItem={selectedItem}
          closeModal={closeModal}
          apiKey={apiKey}
        />
      )}
    </>
  );
};

export default App;
