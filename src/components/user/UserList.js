import React from "react";
import { Link } from 'react-router-dom';

import user from "../../apis/user";
import UserDetail from "./UserDetail";
import Pagination from "../Pagination";

class UserList extends React.Component {
    state = { users: [], pagination: {} };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async (page = 1) => {
        const response = await user.get(`/usuarios?page=${page}`);
        this.setState({ users: response.data.data, pagination: response.data.pagination });
    }

    deleteUser = async (id) => {
        await user.delete(`/usuarios/${id}`);
        this.setState({
            users: this.state.users.filter((user) => {
                return user.id !== id;
            })
        });
    }

    renderUsersDetail() {
        return this.state.users.map((user) => {
            return <UserDetail key={user.id} user={user} onApproveDeleteUser={this.deleteUser} />;
        });
    }

    onSelectPage = (page) => {
        if (this.state.pagination.current !== page) {
            this.fetchUsers(page);
        }
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <Link to="/create-user" className="ui right floated primary button">Agregar usuario</Link>
                    <Pagination pagination={this.state.pagination} onSelectPage={this.onSelectPage} />
                </div>
                <div className="ui relaxed divided list">
                    {this.renderUsersDetail()}
                </div>
            </div>
        );
    }
}

export default UserList;