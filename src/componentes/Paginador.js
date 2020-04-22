import React, { useState } from 'react';

function Paginador(props) {
    const [state, setState] = useState({
        paginador: {
            paginas: Number(Math.ceil(props.totalClientes / props.limite))
        }
    });
    console.log(props);
    const { actual } = props;
    const btnAnterior = ( actual > 1 ) ? <button type="buttom" onClick={props.paginaAnterior} className="btn btn-success mr-2"> &laquo; Anterior </button> : '';
    const btnSiguiente = ( actual !== state.paginador.paginas) ? <button type="buttom" onClick={props.paginaSiguiente} className="btn btn-success"> Siguiente &raquo; </button> : '';
    console.log(state.paginador.paginas);
    return(
        <div className="mt-4 mb-4 d-flex justify-content-center">{ btnAnterior } { btnSiguiente }</div>
    );
}

export default Paginador;