import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
    // Esto es un hooks de react Router DOM es diferente la sintaxis
    const location = useLocation()
    // console.log(location);
    // pathname es para saber la ubicacion en la url que nos encontramos /clientes o /clientes/nuevo
    const urlActual = location.pathname

  return (
     <div className='md:flex md:min-h-screen'>
        <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
            <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>
            <nav>
                <Link  
                    // Esta clase se verifica en que pagina estamos, simplemente manteniendo el color del link de la pagina en donde estoy activo
                    className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} 
                    text-2xl block mt-2 hover:text-blue-300`}
                    to="/clientes"
                >Clientes</Link>
                <Link  
                    className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} 
                    text-2xl block mt-2 hover:text-blue-300`}
                    to="/clientes/nuevo"
                >Nuevo Cliente</Link>
            </nav>
        </div> 
        <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
            {/* Outlet contiene dentro de la masterpage todas las paginas que alli se aniden es decir Esto permite a la interfaz anidada mostrar las rutas hijas cuando son renderizadas */}
            <Outlet />
        </div> 
     </div>    
  )
}

export default Layout