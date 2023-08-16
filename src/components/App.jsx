import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import { useState } from "react";
// import { useEffect } from "react";

// const encabezados = [
//   "contEmail",
//   "contObs",
//   "destinatariosId",
//   "grupoAdmin",
//   "grupoNombre",
//   "grupoSeleccion",
//   "prodDesc",
//   "prodProducto",
//   "prodTipo",
//   "terId",
//   "terNombre",
//   "terTipoId",
//   "userId",
//   "userName",
//   "usuarioGenera",
// ];

const encabezados2 = [
  { key: "contEmail", titulo: "Email" },
  { key: "contObs", titulo: "Observación" },
  { key: "destinatariosId", titulo: "Destinatarios ID" },
  { key: "grupoAdmin", titulo: "Grupo Admin" },
  { key: "grupoNombre", titulo: "Grupo Nombre" },
  { key: "grupoSeleccion", titulo: "Grupo Seleccion" },
  { key: "prodDesc", titulo: "Descripción" },
  { key: "prodProducto", titulo: "Producto" },
  { key: "prodTipo", titulo: "Tipo" },
  { key: "terId", titulo: "ID" },
  { key: "terNombre", titulo: "Nombre" },
  { key: "terTipoId", titulo: "Tipo ID" },
  { key: "userId", titulo: "User ID" },
  { key: "userName", titulo: "User name" },
  { key: "usuarioGenera", titulo: "Usuario General" },
];

// const data = {
//   contEmail: "LSUAREZC@FIDUBOGOTA.COM",
//   contObs: "NO",
//   destinatariosId: "1",
//   grupoAdmin: "LSUAREZC",
//   grupoNombre: "CampRendicion",
//   grupoSeleccion: "SI",
//   prodDesc: "RENDICION",
//   prodProducto: "ENC",
//   prodTipo: "444",
//   terId: "987654321",
//   terNombre: "USUARIO PRUEBA",
//   terTipoId: "C",
//   userId: "20099",
//   userName: "",
//   usuarioGenera: "LSUAREZC",
// };

// const megaData = [
//   {
//     contEmail: "LSUAREZC@FIDUBOGOTA.COM",
//     contObs: "NO",
//     destinatariosId: "1",
//     grupoAdmin: "LSUAREZC",
//     grupoNombre: "CampRendicion",
//     grupoSeleccion: "SI",
//     prodDesc: "RENDICION",
//     prodProducto: "ENC",
//     prodTipo: "444",
//     terId: "987654321",
//     terNombre: "USUARIO PRUEBA",
//     terTipoId: "C",
//     userId: "20099",
//     userName: "",
//     usuarioGenera: "LSUAREZC",
//   },
//   {
//     contEmail: "SSEPULVEDAN@FIDUBOGOTA.COM",
//     contObs: "SI",
//     destinatariosId: "2",
//     grupoAdmin: "SSEPULVEDAN  ",
//     grupoNombre: "CampRendicion",
//     grupoSeleccion: "SI",
//     prodDesc: "RENDICION",
//     prodProducto: "ENC",
//     prodTipo: "444",
//     terId: "987654321",
//     terNombre: "USUARIO PRUEBA",
//     terTipoId: "C",
//     userId: "154505",
//     userName: "",
//     usuarioGenera: "LSUAREZC",
//   },
// ];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Realizar la solicitud GET utilizando la función fetch
        const res = await fetch(
          "https://f5a0b8a7-df51-436e-8bc4-36497fafa187.mock.pstmn.io/get-destino"
        );

        // Verificar si la respuesta es exitosa (código 200)
        if (!res.ok) {
          throw new Error(`Error al realizar la solicitud: ${res.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await res.json();

        // Manipular los datos recibidos
        console.log("Datos recibidos:", data);
        setData(data);
      } catch (err) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const propiedadesTabla = [
    "contEmail",
    "contObs",
    "destinatariosId",
    "grupoAdmin",
    "grupoNombre",
    "grupoSeleccion",
    "prodDesc",
    "prodProducto",
    "prodTipo",
    "terId",
    "terNombre",
    "terTipoId",
    "userId",
    "userName",
    "usuarioGenera",
    "uuid",
  ];

  // Filtrar las propiedades del objeto
  const propiedadesFiltradas = data.map((elemento) =>
    Object.keys(elemento)
      .filter((propiedad) => propiedadesTabla.includes(propiedad))
      .reduce((obj, propiedad) => {
        obj[propiedad] = elemento[propiedad];
        return obj;
      }, {})
  );

  const [showNewEntry, setShowNewEntry] = useState(false);

  function handleShowNewEntry() {
    setShowNewEntry((cur) => !cur);
  }

  const [contEmail, setContEmail] = useState("");
  const [contObs, setContObs] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newEntry = {
      contEmail: contEmail,
      contObs: contObs,
      destinatariosId: "X",
      grupoAdmin: "XXXXXX",
      grupoNombre: "XXXXXX",
      grupoSeleccion: "XXXXXX",
      prodDesc: "XXXXXX",
      prodProducto: "XXXXXX",
      prodTipo: "XXXXXX",
      terId: "XXXXXX",
      terNombre: "XXXXXX",
      terTipoId: "XXXXXX",
      userId: "XXXXXX",
      userName: "XXXXXX",
      usuarioGenera: "XXXXXX",
    };

    setData([...data, newEntry]);
    setContEmail("");
    setContObs("");
  }

  return (
    <div>
      <main className="flex flex-col gap-8 items-center justify-center">
        {isLoading && <h1 className="text-6xl mt-48">Cargando...</h1>}
        {!isLoading && (
          <>
            <table
              id="clientes"
              className="font-sans text-xs border-collapse w-[70%] mt-24"
            >
              <thead>
                <tr>
                  {encabezados2.map((encabezado) => (
                    <HeaderTabla
                      key={encabezado.key}
                      titulo={encabezado.titulo}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {propiedadesFiltradas.map((el) => (
                  <FilaTabla key={el.uuid} filaData={el} />
                ))}
              </tbody>
            </table>

            <div className="flex gap-4">
              <button className="">Previous</button>
              <button className="w-8 h-8 bg-[#228be6] text-white rounded-md">
                1
              </button>
              <button className="w-8 h-8 bg-white text-[#228be6] rounded-md border border-[#228be6]">
                2
              </button>
              <button className="w-8 h-8 bg-white text-[#228be6] rounded-md border border-[#228be6]">
                2
              </button>
              <button className="">Next</button>
            </div>

            {showNewEntry && (
              <form action="newEntry">
                <div className="mb-2">
                  <label className="mr-2" htmlFor="contEmail">
                    Email
                  </label>
                  <input
                    className="border border-gray-400 rounded-md p-2"
                    type="email"
                    name="contEmail"
                    value={contEmail}
                    onChange={(e) => setContEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="mr-2" htmlFor="contObs">
                    Observación
                  </label>
                  <input
                    className="border border-gray-400 rounded-md p-2"
                    type="text"
                    name="contObs"
                    value={contObs}
                    onChange={(e) => setContObs(e.target.value)}
                  />
                </div>
                {/* <div>
                <label className="mr-2" htmlFor="destinatariosId">
                  Destinatarios ID
                </label>
                <input
                  className="border border-gray-400 rounded-md"
                  type="text"
                  name="destinatariosId"
                />
              </div>
              <div>
                <label className="mr-2" htmlFor="grupoAdmin">
                  Grupo Admin
                </label>
                <input
                  className="border border-gray-400 rounded-md"
                  type="text"
                  name="grupoAdmin"
                />
              </div> */}
                <button
                  className="bg-[#1947a1] text-white p-2 rounded-md transition-all duration-300 hover:bg-[#233049]"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
              </form>
            )}
            <button
              className="bg-[#228be6] text-white p-2 rounded-md font-medium"
              onClick={handleShowNewEntry}
            >
              {!showNewEntry ? "Nueva Entrada" : "Cerrar"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

function FilaTabla({ filaData }) {
  FilaTabla.propTypes = {
    filaData: PropTypes.any,
  };

  const rows = [];

  for (const key in filaData) {
    rows.push(filaData[key]);
  }

  return (
    <tr>
      {rows.map((rowel, i) => (
        <ElementoTabla key={i} descripcion={rowel} />
      ))}
    </tr>
  );
}

function ElementoTabla({ descripcion }) {
  ElementoTabla.propTypes = {
    descripcion: PropTypes.any,
  };

  return (
    <td className="border border-solid border-[#ddd] p-2">{descripcion}</td>
  );
}

function HeaderTabla({ titulo }) {
  HeaderTabla.propTypes = {
    titulo: PropTypes.string,
  };

  return <th className="border border-solid border-[#ddd] p-2">{titulo}</th>;
}
