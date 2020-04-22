import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';
import Paginador from '../Paginador';


function Clientes() {
    
    const [state, setState] = useState({
        paginador: {
            offset: 0,
            actual: 1
        },
        limite: 10
    });
    
    const paginaAnterior = () => {
        setState({
            paginador: {
                offset: state.paginador.offset - state.limite,
                actual: state.paginador.actual - 1
            },
            limite: state.limite
        });
    }
    
    const paginaSiguiente = () => {
        setState({
            paginador: {
                offset: state.paginador.offset + state.limite,
                actual: state.paginador.actual + 1
            },
            limite: state.limite
        });
    }
    
    return(
    <Query query={ CLIENTES_QUERY } pollInterval={500} variables={{limite: state.limite, offset: state.paginador.offset}}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if(loading) return "Cargando!";
      if(error) return `Error: ${error.message}`;
      console.log(data);
      return (
      <Fragment>
      <h2 className="text-center">Listado de Clientes</h2>
      <ul className="list-group">
        { data.getClientes.map(item => {
            const { id } = item;
            return (
            <li key={item.id} className="list-group-item mt-4 mb-4">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        {item.nombre} {item.apellido} - {item.empresa}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <Mutation mutation={ ELIMINAR_CLIENTE }>
                        { eliminarCliente => (
                            <button 
                                type="button" 
                                className="btn btn-danger d-block d-md-inline-block mr-4"
                                onClick={ () => {
                                    if(window.confirm('Deseas eliminar este cliente?')){
                                        eliminarCliente({
                                            variables: { id }
                                        })
                                    }
                                }}
                            > 
                                &times; Eliminar
                            </button>
                        )}
                        </Mutation>
                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">Editar Cliente</Link>
                    </div>
                </div>
            </li>
            );
        })}
      </ul>
      <Paginador
        totalClientes={data.totalClientes}
        actual={state.paginador.actual}
        limite={state.limite}
        paginaAnterior={paginaAnterior}
        paginaSiguiente={paginaSiguiente}
      />
      </Fragment>
      )
    }}
    </Query>
    );
}

export default Clientes;