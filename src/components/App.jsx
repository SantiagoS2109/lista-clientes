import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

const encabezados2 = [
  { key: "grupoNombre", titulo: "Nombre campaña" },
  { key: "prodDesc", titulo: "Descripción" },
  { key: "grupoAdmin", titulo: "Administrador grupo" },
  { key: "destinatariosId", titulo: "ID" },
  { key: "terTipoId", titulo: "Tipo documento" },
  { key: "terId", titulo: "Documento" },
  { key: "terNombre", titulo: "Nombre" },
  { key: "contEmail", titulo: "Email" },
  { key: "prodProducto", titulo: "Producto" },
  { key: "prodTipo", titulo: "Tipo" },
  { key: "grupoSeleccion", titulo: "Grupo Seleccion" },
  { key: "contObs", titulo: "Observación" },
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
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const [filtroActivo, setFiltroActivo] = useState(false);

  function handleSeleccionFiltro(e) {
    setFiltroActivo(true);

    const filtro = e.target.value;
    if (filtro === "") setFiltroActivo(false);

    setDataFiltrada(data.filter((element) => element.grupoNombre === filtro));
  }

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
        // console.log("Datos recibidos:", data);
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
    ...new Set(encabezados2.map((elemento) => elemento.key)),
  ];

  function filtrarPropiedadesTabla(dataArray) {
    // Filtrar las propiedades del objeto
    const propiedadesFiltradas = dataArray.map((elemento) =>
      Object.keys(elemento)
        .filter((propiedad) => propiedadesTabla.includes(propiedad))
        .reduce((obj, propiedad) => {
          obj[propiedad] = elemento[propiedad];
          return obj;
        }, {})
    );

    return propiedadesFiltradas;
  }

  const opcionesFiltro = [...new Set(data.map((item) => item.grupoNombre))];

  // console.log(opcionesFiltro);

  const [showNewEntry, setShowNewEntry] = useState(false);

  function handleShowNewEntry() {
    setShowNewEntry((cur) => !cur);
  }

  //////////////////////////////////////////////////////
  // DECLARACION STATE DE MODAL DE REGISTRO

  const [grupoNombre, setGrupoNombre] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [grupoAdmin, setGrupoAdmin] = useState("");
  const [destinatariosId, setDestinatariosId] = useState("");
  const [terTipoId, setTerTipoId] = useState("");
  const [terId, setTerId] = useState("");
  const [terNombre, setTerNombre] = useState("");
  const [contEmail, setContEmail] = useState("");
  const [prodProducto, setProdProducto] = useState("");
  const [prodTipo, setProdTipo] = useState("");
  const [grupoSeleccion, setGrupoSeleccion] = useState("");
  const [contObs, setContObs] = useState("");

  const handleChange = (setState) => (event) => {
    const content = event.target.value;

    setState(content.toUpperCase());
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!contEmail) return;

    // function generateUUID() {
    //   const uuid = crypto.randomUUID();
    //   return uuid;
    // }

    const newEntry = {
      grupoNombre: grupoNombre,
      prodDesc: prodDesc,
      grupoAdmin: grupoAdmin,
      destinatariosId: destinatariosId,
      terTipoId: terTipoId,
      terId: terId,
      terNombre: terNombre,
      contEmail: contEmail,
      prodProducto: prodProducto,
      prodTipo: prodTipo,
      grupoSeleccion: grupoSeleccion,
      contObs: contObs,
      // uuid: generateUUID(),
    };

    setData([...data, newEntry]);
    setGrupoNombre("");
    setProdDesc("");
    setGrupoAdmin("");
    setDestinatariosId("");
    setTerTipoId("");
    setTerId("");
    setTerNombre("");
    setContEmail("");
    setProdProducto("");
    setProdTipo("");
    setGrupoSeleccion("");
    setContObs("");
    setShowNewEntry(false);
  }

  return (
    <div className="flex justify-center static">
      <div className="flex flex-col items-center justify-center w-[1200px]">
        {isLoading && <h1 className="text-6xl mt-32">Cargando...</h1>}
        {!isLoading && (
          <>
            <div className="flex self-start gap-4 mb-4 mt-12">
              <label>Filtrar por campaña:</label>
              <select
                className="border border-gray-300"
                name="selectFiltro"
                id="filtroCampaña"
                onChange={(e) => handleSeleccionFiltro(e)}
              >
                <option value=""></option>
                {opcionesFiltro.map((opcion) => (
                  <OpcionFiltro value={opcion} opcion={opcion} key={opcion} />
                ))}
              </select>
            </div>
            <table
              id="clientes"
              className="font-sans text-xs border-collapse w-full mb-4"
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
                {!filtroActivo &&
                  filtrarPropiedadesTabla(data).map((el) => (
                    <FilaTabla key={el.uuid} filaData={el} />
                  ))}
                {filtroActivo &&
                  filtrarPropiedadesTabla(dataFiltrada).map((el) => (
                    <FilaTabla key={el.uuid} filaData={el} />
                  ))}
              </tbody>
            </table>

            <div className="flex self-end gap-4">
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
              <ModalRegistro
                onHandleChange={handleChange}
                onHandleSubmit={handleSubmit}
                onHandleShowNewEntry={handleShowNewEntry}
                showNewEntry={showNewEntry}
                grupoNombre={grupoNombre}
                prodDesc={prodDesc}
                grupoAdmin={grupoAdmin}
                destinatariosId={destinatariosId}
                terTipoId={terTipoId}
                terId={terId}
                terNombre={terNombre}
                contEmail={contEmail}
                prodProducto={prodProducto}
                prodTipo={prodTipo}
                grupoSeleccion={grupoSeleccion}
                contObs={contObs}
                onSetGrupoNombre={setGrupoNombre}
                onSetProdDesc={setProdDesc}
                onSetGrupoAdmin={setGrupoAdmin}
                onSetDestinatariosId={setDestinatariosId}
                onSetTerTipoId={setTerTipoId}
                onSetTerId={setTerId}
                onSetTerNombre={setTerNombre}
                onSetContEmail={setContEmail}
                onSetProdProducto={setProdProducto}
                onSetProdTipo={setProdTipo}
                onSetGrupoSeleccion={setGrupoSeleccion}
                onSetContObs={setContObs}
              />
            )}
            <button
              className="bg-[#228be6] text-white p-2 rounded-md font-medium mb-12"
              onClick={handleShowNewEntry}
            >
              {!showNewEntry ? "Nueva Entrada" : "Cerrar"}
            </button>
          </>
        )}
      </div>
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

function FormInput({ value, setValue, name, label, type, onHandleChange }) {
  FormInput.propTypes = {
    value: PropTypes.any,
    setValue: PropTypes.any,
    name: PropTypes.any,
    label: PropTypes.any,
    type: PropTypes.string,
    onHandleChange: PropTypes.any,
  };

  return (
    <div className="flex flex-col mb-2">
      <label className="mr-2" htmlFor="contObs">
        {label}
      </label>
      <input
        className="border border-gray-400 rounded-md p-1"
        type={type}
        name={name}
        value={value}
        onChange={onHandleChange(setValue)}
      />
    </div>
  );
}

function OpcionFiltro({ value, opcion }) {
  OpcionFiltro.propTypes = {
    value: PropTypes.any,
    opcion: PropTypes.any,
  };

  return <option value={value}>{opcion}</option>;
}

function ModalRegistro({
  onHandleChange,
  onHandleSubmit,
  onHandleShowNewEntry,
  showNewEntry,
  grupoNombre,
  prodDesc,
  grupoAdmin,
  destinatariosId,
  terTipoId,
  terId,
  terNombre,
  contEmail,
  prodProducto,
  prodTipo,
  grupoSeleccion,
  contObs,
  onSetGrupoNombre,
  onSetProdDesc,
  onSetGrupoAdmin,
  onSetDestinatariosId,
  onSetTerTipoId,
  onSetTerId,
  onSetTerNombre,
  onSetContEmail,
  onSetProdProducto,
  onSetProdTipo,
  onSetGrupoSeleccion,
  onSetContObs,
}) {
  ModalRegistro.propTypes = {
    onHandleChange: PropTypes.any,
    onHandleSubmit: PropTypes.any,
    onHandleShowNewEntry: PropTypes.any,
    showNewEntry: PropTypes.any,
    grupoNombre: PropTypes.any,
    prodDesc: PropTypes.any,
    grupoAdmin: PropTypes.any,
    destinatariosId: PropTypes.any,
    terTipoId: PropTypes.any,
    terId: PropTypes.any,
    terNombre: PropTypes.any,
    contEmail: PropTypes.any,
    prodProducto: PropTypes.any,
    prodTipo: PropTypes.any,
    grupoSeleccion: PropTypes.any,
    contObs: PropTypes.any,
    onSetGrupoNombre: PropTypes.any,
    onSetProdDesc: PropTypes.any,
    onSetGrupoAdmin: PropTypes.any,
    onSetDestinatariosId: PropTypes.any,
    onSetTerTipoId: PropTypes.any,
    onSetTerId: PropTypes.any,
    onSetTerNombre: PropTypes.any,
    onSetContEmail: PropTypes.any,
    onSetProdProducto: PropTypes.any,
    onSetProdTipo: PropTypes.any,
    onSetGrupoSeleccion: PropTypes.any,
    onSetContObs: PropTypes.any,
  };

  return (
    <div className="absolute top-8 w-[600px] h-max bg-slate-300 rounded-md p-4">
      <div>
        <button
          className="bg-[#228be6] text-white p-2 rounded-md font-medium"
          onClick={onHandleShowNewEntry}
        >
          {!showNewEntry ? "Nueva Entrada" : "Cerrar"}
        </button>
      </div>
      <h1 className="text-center font-bold text-xl my-2">Nuevo Registro</h1>
      <form action="nuevoRegistro">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FormInput
              value={grupoNombre}
              setValue={onSetGrupoNombre}
              name={"grupoNombre"}
              label={"Nombre Campaña"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={prodDesc}
              setValue={onSetProdDesc}
              name={"prodDesc"}
              label={"Descripción"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={grupoAdmin}
              setValue={onSetGrupoAdmin}
              name={"grupoAdmin"}
              label={"Administrador grupo"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={destinatariosId}
              setValue={onSetDestinatariosId}
              name={"destinatariosId"}
              label={"ID"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={terTipoId}
              setValue={onSetTerTipoId}
              name={"terTipoId"}
              label={"Tipo documento"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={terId}
              setValue={onSetTerId}
              name={"terId"}
              label={"Documento"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
          </div>
          <div>
            <FormInput
              value={terNombre}
              setValue={onSetTerNombre}
              name={"terNombre"}
              label={"Nombre"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={contEmail}
              setValue={onSetContEmail}
              name={"contEmail"}
              label={"Email"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={prodProducto}
              setValue={onSetProdProducto}
              name={"prodProducto"}
              label={"Producto"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={prodTipo}
              setValue={onSetProdTipo}
              name={"prodTipo"}
              label={"Tipo"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={grupoSeleccion}
              setValue={onSetGrupoSeleccion}
              name={"grupoSeleccion"}
              label={"Grupo Selección"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
            <FormInput
              value={contObs}
              setValue={onSetContObs}
              name={"contObs"}
              label={"Observación"}
              type={"text"}
              onHandleChange={onHandleChange}
            />
          </div>
        </div>

        <button
          className="bg-[#1947a1] text-white p-2 rounded-md transition-all duration-300 hover:bg-[#233049]"
          onClick={onHandleSubmit}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
