import React, { useState } from 'react';
import { ACTUALIZAR_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom'; 

function FormularioEditarCliente(props) {
    const [nombre, setNombre] = useState( props.cliente.nombre );
    const [apellido, setApellido] = useState( props.cliente.apellido );
    const [empresa, setEmpresa] = useState( props.cliente.empresa );
    const [edad, setEdad] = useState( props.cliente.edad );
    const [email, setEmail] = useState( '' );
    const [tipo, setTipo] = useState( props.cliente.tipo );
    const [error, setError] = useState( false );
    const [emails, setEmails] = useState(props.cliente.emails);
    let respuesta = ( error ) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';  

    const nuevoCampo = () => {
        setEmails( emails.concat([{ email: '' }]));
    }
    
    const leerCampo = i => e => {
        const nuevoMail = emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        setEmails(nuevoMail);
    }

    const quitarCampo = i => () => {
        setEmails(emails.filter((s, index) => i !== index));
    }
    
    return (
        <Mutation 
            mutation={ ACTUALIZAR_CLIENTE }
            onCompleted={ () => props.refetch().then( () => props.history.push( '/' ))}
        >
        { actualizarCliente => (
            <form className="col-md-8 m-3" onSubmit={ e => {
                e.preventDefault();
                const input = {
                    id: props.cliente.id,
                    nombre,
                    apellido,
                    empresa,
                    edad: Number(edad),
                    tipo,
                    emails
                };
                actualizarCliente({
                    variables: { input }
                });
            }}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={ nombre }
                            onChange={ e => setNombre( e.target.value )}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Apellido</label>
                        <input 
                            type="text" 
                            className="form-control"
                            defaultValue={ apellido }
                            onChange={ e => setApellido( e.target.value )}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Empresa</label>
                        <input
                            type="text" 
                            className="form-control" 
                            defaultValue={ empresa }
                            onChange={ e => setEmpresa( e.target.value )}
                        />
                    </div>
                    { emails.map((input, index) => (
                        <div key={index} className="form-group col-md-12">
                            <label>Email { index + 1 } : </label>
                        <div className="input-group">
                            <input 
                                type="email"
                                placeholder={`Email`}
                                className="form-control" 
                                onChange={ leerCampo(index) }
                                defaultValue={ input.email }
                            />
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-danger" 
                                    type="button" 
                                    onClick={ quitarCampo(index) }> 
                                        &times; Eliminar
                                </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    <div className="form-group d-flex justify-content-center col-md-12">
                        <button 
                            onClick={ nuevoCampo }
                            type="button" 
                            className="btn btn-warning"
                        >+ Agregar Email</button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Edad</label>
                        <input
                            type="text" 
                            className="form-control" 
                            defaultValue={ edad }
                            onChange={ e => setEdad( e.target.value )}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tipo Cliente</label>  
                        <select 
                            className="form-control"
                            defaultValue={ tipo } 
                            onChange={ e=> setTipo( e.target.value)}
                        >
                            <option value="">Elegir...</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="BASICO">BÁSICO</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
            </form>
        )}
        </Mutation>
    )    
}
 

export default withRouter(FormularioEditarCliente);