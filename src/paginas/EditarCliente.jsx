import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {

  const [cliente,setCliente] = useState({})
  const [cargando,setCargando] = useState(true)

  const { id } = useParams()

  // Para mostrar el cliente por id
  useEffect(() => {

      const obtenerClienteApi = async () => {
          try {
              const url = `${import.meta.env.VITE_API_URL}/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado);
          } catch (error) {
              console.log(error);
          }
          // Una sintaxis comun de react es colocar en vez de usar false se coloca !cargando lo opuesto al estado actual
          setCargando(!cargando)
      }
      obtenerClienteApi()
  },[])
  
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p> 
           {/*Esta sintasis de doble && es de una sola opcion de salida es una manera simple de un ternario, lo dejo como referencia pero esta vez usaremos el ternario  */}
        {/* {cliente?.nombre && (
          <Formulario
            cliente={cliente}
            cargando={cargando}
        />  */}

        {cliente?.nombre ? (
          <Formulario
            cliente={cliente}
            cargando={cargando}
          /> 
        ): <p className="text-4xl text-red-700">Id cliente no valido</p>}
    </> 
  )
}

export default EditarCliente