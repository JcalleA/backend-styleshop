import React from 'react';

const Negocio = (props) => {
    return (
        <div className='container'>
            <div className="col-sm-3 mt-3 text-center">
                <div className="card bg-dark border-white text-white">
                    <img height="180" width="auto" src={props.imagenUrl} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.nombre}</h5>
                        <p className="card-text auto pe-2">{props.ciudad}</p>
                        <p className="card-text auto pe-2">{props.telefono}</p>
                        <button type="button" className="btn btn-primary m-2">Reservar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Negocio