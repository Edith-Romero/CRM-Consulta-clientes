import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './layaout/Layout'
import EditarCliente from './paginas/EditarCliente'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'


function App() {

  return (
    // Contenedor principal
    <BrowserRouter>
    {/* Rutas */}
      <Routes>
        {/* Aca se coloca el mastepages y dentro de el las  rutas como etiquetas solo con un cierre */}
        <Route path="/clientes" element={<Layout/>}>
          {/* Se le coloca el index para saber cual es el componente principal que se va cargar */}
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          {/* Para editar necesito saber el id de cada cliente 
          React Router DOM me permite un placeholder el cual coloco asi editar/ :id */}
          <Route path="editar/:id" element={<EditarCliente/>}/>
          <Route path=":id" element={<VerCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App