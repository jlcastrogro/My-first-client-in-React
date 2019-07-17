import React from 'react';

const Modal = (props) => {
    const active = props.show ? 'active' : '';

    return (
        <div className={`ui ${active} modal`}>
            <div className="header">Confirmación</div>
            <div className="content">
                <p>¿Está seguro de eliminar este usuario?</p>
            </div>
            <div className="actions">
                <div className="ui approve button" onClick={props.onApproveDeleteUser}>Aceptar</div>
                <div className="ui cancel button" onClick={props.onCancelModal}>Cancelar</div>
            </div>
        </div>
    );
};

export default Modal;