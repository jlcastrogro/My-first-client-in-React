import React from 'react';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <a href="/" className="item">
                Home
            </a>
            <div className="right menu">
                <a href="/users" className="item">
                    Usuarios
                </a>
                {/* <div className="item">
                    <Link to="/users" className="ui blue button">Entrar</Link>
                </div> */}
                {/* <div className="item">
                    <Link to="/login" className="ui grey button">Salir</Link>
                </div> */}
            </div>
        </div>
    );
};

export default Header;