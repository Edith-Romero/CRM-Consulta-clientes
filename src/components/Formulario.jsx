import React from 'react'
import { Formik, Form, Field} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente,cargando}) => {

    // useNavigate de react-router-dom funcion que me permite redireccionar al usuario a otra pagina o url
    const navigate = useNavigate()

    //Yup: Crea un Schema  de validacion del objeto y las formas que deben tener todos los campos para que sean validos
    // Yup.object().shape : Permite validar multiplex valores de un solo campo
    const  nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                   .min(3, 'El nombre es muy corto')
                   .max(20, 'El nombre es muy largo')
                   .required("El Nombre del Cliente es Obligatorio"),
        empresa:Yup.string()
                   .required('El Nombre de la empresa es Obligatorio'),
        email:  Yup.string('El Email es Obligatorio')
                   .email('Email no valido')
                   .required('El Email es Obligatorio'),
        telefono:Yup.number()
                    .positive('Numero no Valido')
                    .integer('Numero no Valido')
                    .required('El Numero no Valido'),
    })

    const handleSubmit = async (valores) =>{
        // Esta sintaxis se usa para saber que proceso se debe ejecutar. AGREGAR O EDITAR resgistro
        try {
            let respuesta
                if(cliente.id){

                    const url = `${import.meta.env.VITE_API_URL}/${cliente.id}` 
                
                    respuesta = await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(valores),
                        headers:{
                            'Content-Type': 'application/json',
                        }
                    })
                } else{
                    const url = import.meta.env.VITE_API_URL  
                
                    respuesta = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(valores),
                        headers:{
                            'Content-Type': 'application/json',
                        }
                    })
                }

                await respuesta.json()
            
                navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner/> : (

        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'> 
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'
            >{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
            <Formik
                // Valores iniciales para el formulario. Tambien se usa para Editar el cliente, usamos
                //  cliente?.nombre ?? "" que es un ternario en nueva sintaxis, si la variable esta vacia
                // dejalo como vacio sino trae el contenido que tenga
                initialValues={{
                    nombre:cliente?.nombre ?? "",
                    empresa:cliente?.empresa ?? "",
                    email:cliente?.email ?? "",
                    telefono:cliente?.telefono ?? "",
                    notas:cliente?.notas ?? "",
                }}
                // Controla si se tiene que restablecer el formulario si cambia initialValues
                enableReinitialize = {true}
                // resetForm es la funcion para resetear el formulario
                // pero  lo que va a ocurrir es que al darle click al boton agregar datos pueda guardar antes de resetear a traves de una promesa
                onSubmit={ async (valores, {resetForm})=>{
                    await handleSubmit(valores);

                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}
            >
                {({errors,touched})=>{
                    //  touched se ejecuta cuando doy click fuera del formulario y me coloca el nombre como true
                    // console.log(touched);
                    return(
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre</label>
                        <Field
                            id="nombre"
                            type="text"
                            className = "mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del Cliente"
                            name = "nombre"
                        />
                        {errors.nombre && touched.nombre ? (
                            <div>
                                <Alerta>{errors.nombre}</Alerta>
                            </div>
                        ): null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa</label>
                        <Field
                            id="empresa"
                            type="text"
                            className = "mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />
                        {errors.empresa && touched.empresa ? (
                            <div>
                                <Alerta>{errors.empresa}</Alerta>
                            </div>
                        ): null}                    
                        </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='email'
                        >Email</label>
                        <Field
                            id="email"
                            type="email"
                            className = "mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del Cliente"
                            name="email"
                        />
                        {errors.email && touched.email ? (
                            <div>
                                <Alerta>{errors.email}</Alerta>
                            </div>
                        ): null}                    
                    </div>
                        <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Telefono</label>
                        <Field
                            id="telefono"
                            type="tel"
                            className = "mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del Cliente"
                            name="telefono"
                        />
                        {errors.telefono && touched.telefono ? (
                            <div>
                                <Alerta>{errors.telefono}</Alerta>
                            </div>
                        ): null} 
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas</label>
                        <Field
                            as="textarea"
                            id="notas"
                            type="text"
                            className = "mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>
                    <input
                        type='submit'
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-4 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                    />
                </Form>
                )}}
            </Formik>
        </div>
    )
  )
}
// Funciona como los parametros por default sino estan presente toma los de aca, sino viceversa
Formulario.defaultProps = {
    cliente:{},
    cargando:false
}

export default Formulario