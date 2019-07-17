import React from 'react';
import user from '../apis/user';
import history from '../history';

class Login extends React.Component {
    state = { showErrors: false, errors: [] };

    onSubmit = (e) => {
        e.preventDefault();
        this.login(e.target);
    }

    login = async (target) => {
        const {
            email,
            password
        } = target;

        const userJson = {
            "email": email.value,
            "password": password.value
        };

        let errors = [];

        if (email.value === '') {
            errors.push(<li key="1">Ingresa tu Correo Electrónico</li>);
        }
        if (password.value === '') {
            errors.push(<li key="2">Ingresa tu Contraseña</li>);
        }
        if (errors.length === 0) {
            this.setState({ showErrors: false, errors: [] });
            await user.post('/login', userJson)
                .then(response => {
                    history.push('/');
                })
                .catch(error => {
                    if (error.response.status) {
                        errors.push(<li key="1">Credenciales incorrectas. Vuelva a intentarlo.</li>);
                        this.setState({ showErrors: true, errors });
                    }
                });
        } else {
            this.setState({ showErrors: true, errors });
        }
    }

    render() {
        return (
            <div className="ui middle center aligned grid" style={{ height: '100%' }}>
                <div className="column" style={{ 'maxWidth': '40%' }}>
                    <h2 className="ui teal image header">
                        <div className="content">
                            Entrar
                        </div>
                    </h2>
                    <form className="ui large form" onSubmit={this.onSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                                <label>Correo Electrónico</label>
                                <input name='email' type="email" placeholder="Correo Electrónico" />
                            </div>
                            <div className="field">
                                <label>Contraseña</label>
                                <input name='password' type="password" placeholder="Contraseña" />
                            </div>
                            <button className="ui fluid large teal submit button">Entrar</button>
                            <div className={`ui message ${!this.state.showErrors ? 'hidden' : ''}`}>
                                <ul className="list" >
                                    {this.state.errors}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;