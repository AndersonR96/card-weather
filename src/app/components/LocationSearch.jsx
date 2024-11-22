import { useEffect, useState } from "react";
import WeatherDetailsModal from "./WeatherDetailsModal";

function LocationSearch({ theme }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const URL = import.meta.env.VITE_API_URL;

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const openModal = (item) => {
    setQuery(item.name);
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem("");
  };

  const fetchLocations = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${URL}search.json?key=${apiKey}&q=${searchTerm}`
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
}
export default LocationSearch;
