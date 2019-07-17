import React from 'react';

import user from './../../apis/user';
import history from '../../history';

class UserCreate extends React.Component {
    state = { showErrors: false, errors: [] };

    onSubmit = (e) => {
        e.preventDefault();
        this.postUser(e.target);
    }

    postUser = async (target) => {
        const { nombre,
            apellidos,
            email,
            password,
            fechaNacimiento
        } = target;

        const userJson = {
            "nombre": nombre.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "password": password.value,
            "fechaNacimiento": fechaNacimiento.value
        };

        let errors = [];

        if (nombre.value === '') {
            errors.push(<li key="1">Ingresa tu Nombre</li>);
        }
        if (apellidos.value === '') {
            errors.push(<li key="2"> Ingresa tus Apellidos</li >);
        }
        if (email.value === '') {
            errors.push(<li key="3">Ingresa tu Correo Electrónico</li>);
        }
        if (password.value === '') {
            errors.push(<li key="4">Ingresa una Contraseña</li>);
        }
        if (fechaNacimiento.value === '') {
            errors.push(<li key="5">Ingresa tu Fecha de Nacimiento</li>);
        }
        if (errors.length === 0) {
            this.setState({ showErrors: false, errors: [] });
            await user.post('/usuarios', userJson)
                .then(response => {
                    history.push('/users');
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        errors.push(<li key="1">Ya existe un usario con el correo electrónico {email.value}</li>);
                        this.setState({ showErrors: true, errors });
                    }
                });
        } else {
            this.setState({ showErrors: true, errors });
        }
    }

    render() {
        return (
            <div>
                <h1 className="ui dividing header">Crear Usuario</h1>
                <form className='ui form' onSubmit={this.onSubmit}>
                    <div className={`ui message ${!this.state.showErrors ? 'hidden' : ''}`}>
                        <div className="header">Tenemos algunos problemas:</div>
                        <ul className="list" >
                            {this.state.errors}
                        </ul>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Nombre(s)</label>
                                <input name="nombre" type="text" placeholder="Nombre" />
                            </div>
                            <div className="field">
                                <label>Apellido(s)</label>
                                <input name="apellidos" type="text" placeholder="Apellidos" />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Contraseña</label>
                                <input name="password" type="password" placeholder="Contraseña" />
                            </div>
                            <div className="field">
                                <label>Correo Electrónico</label>
                                <input name="email" type="email" placeholder="Correo Electrónico" />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Fecha de Nacimiento</label>
                        <input name="fechaNacimiento" type="date" placeholder="Fecha de nacimiento" />
                    </div>
                    <button className="ui right floated primary button">Agregar</button>
                </form>
            </div>
        );
    }
}

export default UserCreate;