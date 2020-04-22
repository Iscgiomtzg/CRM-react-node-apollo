import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';
import { Link } from 'react-router-dom';
import { ELIMINAR_PRODUCTO } from '../../mutations';

function Productos(props){
    const [state, setState] = useState({
        paginador: {
            offset: 0,
            actual: 1
        },
        limite: 10
    });
    return(
        <Fragment>
            <h1 className="text-center mb-5">Productos</h1 >
            <Query query={PRODUCTOS_QUERY} pollInterval={500} variables={{limite: state.limite, offset: state.paginador.offset}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                if(loading) return "Cargando!";
                if(error) return `Error: ${error.message}`;
                console.log(data);
                return (
                    <table className="table text-center">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Existencia</th>
                                <th scope="col">Eliminar</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.obtenerProductos.map( item => {
                                    const { id } = item;
                                    return (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.precio}</td>
                                        <td>{item.stock}</td>
                                        <td><Mutation mutation={ELIMINAR_PRODUCTO}>{ eliminarProducto => (
                                                <button type="button" className="btn btn-danger" onClick={ () => { eliminarProducto({ variables: { id } }) } }>&times; Eliminar</button>
                                            )}</Mutation></td>
                                        <td><Link to={`/producto/editar/${item.id}`} type="button" className="btn btn-warning">Editar</Link></td>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                )
                }}
            </Query>
        </Fragment>
    );    
}

export default Productos;