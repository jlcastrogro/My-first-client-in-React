import React from 'react';

import user from './../../apis/user';
import history from '../../history';

class UserUpdate extends React.Component {
    state = { user: null, showErrors: false, errors: [] };

    componentDidMount() {
        this.fetchUser(this.props.match.params.id);
    }

    fetchUser = async (id) => {
        const response = await user.get(`/usuarios/${id}`);
        this.setState({ user: response.data.user });
    }

    onInputChange = (e) => {
        const user = Object.assign({}, this.state.user);
        const { name, value } = e.target;
        user[name] = value;
        this.setState({ user });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.putUser(e.target);
    }

    putUser = async (target) => {
        const {
            nombre,
            apellidos,
            fechaNacimiento
        } = target;

        const userJson = {
            "nombre": nombre.value,
            "apellidos": apellidos.value,
            "fechaNacimiento": fechaNacimiento.value
        };

        let errors = [];

        if (nombre.value === '') {
            errors.push(<li key="1">Ingresa tu Nombre</li>);
        }
        if (apellidos.value === '') {
            errors.push(<li key="2"> Ingresa tus Apellidos</li >);
        }
        if (fechaNacimiento.value === '') {
            errors.push(<li key="5">Ingresa tu Fecha de Nacimiento</li>);
        }
        if (errors.length === 0) {
            this.setState({ showErrors: false, errors: [] });
            await user.put(`/usuarios/${this.state.user.id}`, userJson);
            history.push('/users');
        } else {
            this.setState({ showErrors: true, errors });
        }
    }

    render() {
        if (this.state.user !== null) {
            return (
                <div>
                    <h1 className="ui dividing header">Actualizar Usuario</h1>
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
                                    <input name="nombre" type="text" placeholder="Nombre" value={this.state.user.nombre} onChange={this.onInputChange} />
                                </div>
                                <div className="field">
                                    <label>Apellido(s)</label>
                                    <input name="apellidos" type="text" placeholder="Apellidos" value={this.state.user.apellidos} onChange={this.onInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="field">
                                <label>Fecha de Nacimiento</label>
                                <input name="fechaNacimiento" type="date" placeholder="Fecha de Nacimiento" value={this.state.user.fechaNacimiento} onChange={this.onInputChange} />
                            </div>
                        </div>
                        <button className="ui right floated primary button">Guardar</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

export default UserUpdate;