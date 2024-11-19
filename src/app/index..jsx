import { useState } from "react";
import WeatherDetailsModal from "./components/WeatherDetailsModal";

function App() {
  return (
    <>
      {/* <h1>App Screen</h1> */}
      <LocationSearch />
    </>
  );
}

const LocationSearch = () => {
  // console.log(import.meta.env.VITE_API_KEY)
  console.log(import.meta.env.VITE_MESSAGE)
  const apiKey = import.meta.env.VITE_API_KEY
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const openModal = (item) => {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchTerm}&lang=es`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Imprime "Cali"
        setData(data);
        // console.log(data.location.name); // Imprime "Cali"
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Término de búsqueda:", searchTerm);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center sm:justify-center w-full p-4"
      >
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
        >
          Buscar
        </button>
      </form>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <ul className="w-full sm:w-3/4 lg:w-1/2 max-w-md space-y-4 px-4">
          {data ? (
            <h1 className="text-2xl font-bold mb-5 text-center">Resultados</h1>
          ) : null}
          {data?.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => openModal(item)}
                className="w-full text-left px-4 py-3 bg-white rounded-md shadow hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Modal */}
        {isOpen && (
          <WeatherDetailsModal
            selectedItem={selectedItem}
            closeModal={closeModal}
            apiKey={apiKey}
          />
          // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          //   <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          //     <h2 className="text-xl font-semibold mb-4 text-center">
          //       {selectedItem.name} - {selectedItem.region}
          //     </h2>
          //     <p className="text-gray-700 mb-6 text-center">
          //       País: {selectedItem.country}
          //     </p>
          //     <button
          //       onClick={closeModal}
          //       className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          //     >
          //       Cerrar
          //     </button>
          //   </div>
          // </div>
        )}
      </div>
    </>
  );
};

export default App;
