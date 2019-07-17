import React from 'react';

import Modal from '../Modal';

class UserDetail extends React.Component {
    state = { modalShow: false };

    showModal = () => {
        this.setState({ modalShow: true });
    }

    onCancelModal = () => {
        this.setState({ modalShow: false });
    }

    onApproveDeleteUser = () => {
        this.setState({ modalShow: false });
        this.props.onApproveDeleteUser(this.props.user.id);
    }

    render() {
        return (
            <div>
                <Modal show={this.state.modalShow} onCancelModal={this.onCancelModal} onApproveDeleteUser={this.onApproveDeleteUser} />
                <div className="ui divided items">
                    <div className="item">
                        <div className="image">
                            <img src="/img/image.png" alt="avatar" />
                        </div>
                        <div className="content">
                            <div className="header">{`${this.props.user.nombre} ${this.props.user.apellidos}`}</div>
                            <div className="meta">
                                <span className="cinema">{this.props.user.email}</span>
                            </div>
                            <div className="description">
                                <p>{this.props.user.updatedAt}</p>
                            </div>
                            <div className="extra">
                                <button className="ui right floated red button" onClick={this.showModal}>Eliminar</button>
                                <a className="ui right floated blue button" href={`/update-user/${this.props.user.id}`}>Actualizar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default UserDetail;
