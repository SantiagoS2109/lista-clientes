function fetchData(url) {
  // Realizar la solicitud GET utilizando la función fetch
  fetch(url)
    .then((response) => {
      // Verificar si la respuesta es exitosa (código 200)
      if (!response.ok) {
        throw new Error(`Error al realizar la solicitud: ${response.status}`);
      }
      // Convertir la respuesta a JSON
      return response.json();
    })
    .then((data) => {
      // Manipular los datos recibidos
      console.log("Datos recibidos:", data);
    })
    .catch((error) => {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error("Error:", error);
    });
}

// Llamar a la función para consumir la API
const apiUrl =
  "https://f5a0b8a7-df51-436e-8bc4-36497fafa187.mock.pstmn.io/get-destino"; // Reemplaza con la URL de la API real
fetchData(apiUrl);
