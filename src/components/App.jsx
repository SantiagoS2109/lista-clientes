import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import fiduciariaBogotaImg from "../assets/img/logo.webp";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
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
  const [destinatariosId, setDestinatariosId] = useState("");
  const [grupoAdmin, setGrupoAdmin] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!contEmail) return;

    function generateUUID() {
      const uuid = crypto.randomUUID();
      return uuid;
    }

    const newEntry = {
      contEmail: contEmail,
      contObs: contObs,
      destinatariosId: destinatariosId,
      grupoAdmin: grupoAdmin,
      grupoNombre: "XXXXXX",
      grupoSeleccion: "XXXXXX",
      prodDesc: "XXXXXX",
      prodProducto: "XXXXXX",
      prodTipo: "XXXXXX",
      terId: "XXXXXX",
      terNombre: "PEPIRO PEREZ",
      terTipoId: "XXXXXX",
      userId: "XXXXXX",
      userName: "XXXXXX",
      usuarioGenera: "XXXXXX",
      uuid: generateUUID(),
    };

    setData([...data, newEntry]);
    setContEmail("");
    setContObs("");
    setDestinatariosId("");
    setGrupoAdmin("");
    setShowNewEntry(false);
  }

  return (
    <div>
      <main className="flex flex-col gap-8 items-center justify-center">
        <header className="flex flex-col items-center">
          <div className="object-cover object-[80%] h-[150px]">
            <img src={fiduciariaBogotaImg} alt="Fiduciaría Bogotá" />
          </div>
          <h1 className="text-4xl uppercase font-bold text-[#121f4f]">
            Gestión de Grupos
          </h1>
        </header>
        {isLoading && <h1 className="text-6xl mt-32">Cargando...</h1>}
        {!isLoading && (
          <>
            <table
              id="clientes"
              className="font-sans text-xs border-collapse w-[70%] mt-8"
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
              <button className="rounded-md border border-[#228be6]">
                <CaretLeft color="#228be6" size={24} />
              </button>
              <button className="w-8 h-8 bg-[#228be6] text-white rounded-md">
                1
              </button>
              <button className="w-8 h-8 bg-white text-[#228be6] rounded-md border border-[#228be6]">
                2
              </button>
              <button className="w-8 h-8 bg-white text-[#228be6] rounded-md border border-[#228be6]">
                3
              </button>
              <button className="rounded-md border border-[#228be6]">
                <CaretRight color="#228be6" size={24} />
              </button>
            </div>

            {showNewEntry && (
              <form action="newEntry">
                <FormInput
                  value={contEmail}
                  setValue={setContEmail}
                  name={"contEmail"}
                  descripcion={"Email"}
                  type={"text"}
                />
                <FormInput
                  value={contObs}
                  setValue={setContObs}
                  name={"contObs"}
                  descripcion={"Observación"}
                  type={"text"}
                />
                <FormInput
                  value={destinatariosId}
                  setValue={setDestinatariosId}
                  name={"destinatariosId"}
                  descripcion={"Destinatarios ID"}
                  type={"text"}
                />
                <FormInput
                  value={grupoAdmin}
                  setValue={setGrupoAdmin}
                  name={"grupoAdmin"}
                  descripcion={"Grupo Admin"}
                  type={"text"}
                />

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
              className="bg-[#228be6] text-white p-2 rounded-md font-medium mb-12"
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

  if (descripcion.length > 30) return;

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

function FormInput({ value, setValue, name, descripcion, type }) {
  FormInput.propTypes = {
    value: PropTypes.any,
    setValue: PropTypes.any,
    name: PropTypes.any,
    descripcion: PropTypes.any,
    type: PropTypes.string,
  };

  return (
    <div className="mb-2">
      <label className="mr-2" htmlFor="contObs">
        {descripcion}
      </label>
      <input
        className="border border-gray-400 rounded-md p-2"
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
