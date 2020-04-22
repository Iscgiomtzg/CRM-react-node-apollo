import React, { Fragment, useState } from 'react';
import { NUEVO_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';


function NuevoCliente(props) {
    // Una variable para cada estado
    const [nombre, setNombre] = useState( '' );
    const [apellido, setApellido] = useState( '' );
    const [empresa, setEmpresa] = useState( '' );
    const [edad, setEdad] = useState( 0 );
    const [email, setEmail] = useState( '' );
    const [tipo, setTipo] = useState( '' );
    const [error, setError] = useState( false );
    const [emails, setEmails] = useState( [] );
    
    let respuesta = ( error ) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';  
    
    const nuevoCampo = () => {
        setEmails( emails.concat({ email }));
    }
    
    const quitarCampo = i => () => {
        setEmails( emails.filter((email, index) => i !== index));
    }
    
    const leerCampo = i => e => {
        setEmails( emails.map(( email, index ) => {
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        }));
    }
    
    return (
        <Fragment>
        <h2 className="text-center">Nuevo Cliente </h2>
        { respuesta }
        <div className="row justify-content-center">
            <Mutation 
                mutation={ NUEVO_CLIENTE }
                onCompleted={ () => props.history.push( '/' )}
            >
                { crearCliente => (
                    <form 
                    className="col-md-8 m-3" 
                    onSubmit={ e => {
                        e.preventDefault();
                        if( nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '' ) {
                            setError( true );
                            return;
                        }
                        setError(false);
                        const input ={
                            nombre,
                            apellido,
                            empresa,
                            edad: Number( edad ),
                            tipo,
                            emails
                        };
                        crearCliente({
                            variables: { input }
                        });
                    }}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre"
                                    onChange={e => {
                                        setNombre( e.target.value );
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Apellido"
                                    onChange={e => {
                                        setApellido( e.target.value );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Empresa"
                                        onChange={ e => {
                                        setEmpresa( e.target.value );
                                        }}
                                    />
                            </div>
                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Correo: { index + 1 }</label>
                                    <div className="input-group">
                                        <input
                                            onChange={ leerCampo(index) }
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                        />
                                        <div className="input-control-append">
                                            <button 
                                                onClick={quitarCampo(index)}
                                                type="button" 
                                                className="btn btn-danger">&times; Eliminar </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button 
                                    onClick={ nuevoCampo } 
                                    type="button" 
                                    className="btn btn-warning"
                                >
                                    + Agregar Email
                                </button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Edad"
                                    onChange={e => {
                                        setEdad( e.target.value );
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    className="form-control"
                                    onChange={e => {
                                        setTipo( e.target.value );
                                    }}
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                    </form>
                )}
            </Mutation>
        </div>
    </Fragment>
    );
}

export default NuevoCliente;