import React from 'react';

class Pagination extends React.Component {
    onSelectPage = (e) => {
        this.props.onSelectPage(e.target.text);
    }

    renderItems() {
        let array = [];
        const { total, pageSize, current } = this.props.pagination;
        const pages = Math.ceil(total / pageSize);

        for (let index = 1; index <= pages; index++) {
            if (current === index) {
                array.push(<a key={index} className="active item">{index}</a>);
            } else {
                array.push(<a key={index} className="item">{index}</a>);
            }
        }

        return array;
    }

    render() {
        return (
            <div className="ui pagination menu" onClick={this.onSelectPage}>
                {this.renderItems()}
            </div>
        );
    }
}

export default Pagination;