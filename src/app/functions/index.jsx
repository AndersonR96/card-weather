export default function toggleFavoriteCity(cityName, countryName) {
    // Obtener el array de ciudades favoritas del localStorage o inicializarlo si no existe
    let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
  
    // Verificar si la ciudad ya está en el array
    const isCityAlreadyAdded = favoriteCities.some(
      (city) => city.city === cityName && city.country === countryName
    );
  
    if (isCityAlreadyAdded) {
      // Eliminar la ciudad si ya está en favoritos
      favoriteCities = favoriteCities.filter(
        (city) => !(city.city === cityName && city.country === countryName)
      );
      console.log(`${cityName}, ${countryName} ha sido eliminada de favoritos.`);
    } else {
      // Agregar la nueva ciudad si no está en favoritos
      favoriteCities.push({ city: cityName, country: countryName });
      console.log(`${cityName}, ${countryName} ha sido agregada a favoritos.`);
    }
  
    // Guardar el array actualizado en el localStorage
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  
    // Retornar el nuevo estado (true si se agregó, false si se eliminó)
    return !isCityAlreadyAdded;
  }
  