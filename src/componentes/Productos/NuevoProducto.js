import React, { Fragment, useState } from 'react';
import { NUEVO_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';

function NuevoProducto(props) {
    // individuales
    // const [nombre, setNombre] = useState('');
    // const [precio, setPrecio] = useState(0);
    // const [stock, setStock] = useState(0);
    
    // estado en un objeto
    const [state, setState] = useState({});
    
    const actualizarState = e => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    }
    
    const validarFormulario = () => {
        const noValido = !state.nombre || !state.precio || !state.stock;
        return noValido;
    }
    
    const input = {
        nombre: state.nombre,
        precio: Number(state.precio),
        stock: Number(state.stock)
    }
    
    const crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault();
        nuevoProducto().then(data => {
            // Direccionar
            props.history.push('/productos');
        })
    }
    
    return(
        <Fragment>
            <h1 className="text-center mb-5">Nuevo Producto</h1>
            <div className="row justify-content-center">
                <Mutation mutation={ NUEVO_PRODUCTO } variables={{ input }}>
                    {(nuevoProducto, { loading, error, data }) => {
                        return (
                            <form className="col-md-8" 
                                onSubmit={ e => crearNuevoProducto(e, nuevoProducto)}
                            >
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input 
                                            type="text"
                                            name="nombre" 
                                            className="form-control" 
                                            placeholder="Nombre"
                                            onChange={ actualizarState }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input 
                                                type="number" 
                                                name="precio" 
                                                className="form-control" 
                                                placeholder="Precio"
                                                onChange={actualizarState}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock:</label>
                                        <input 
                                            type="number" 
                                            name="stock" 
                                            className="form-control" 
                                            placeholder="Stock"
                                            onChange={actualizarState}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-success float-right"
                                        disabled={validarFormulario()}
                                    >
                                            Crear Producto
                                    </button>
                                </form>
                        )
                    }}
                </Mutation>
            </div>
        </Fragment>
    );
}

export default NuevoProducto;