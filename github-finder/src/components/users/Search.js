import React, { Component } from 'react';
import PropTypes from 'prop-types'  // shortcut impt


class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    // ** This Method is Used to dynamically update state whenever text input changes in the Search **
    onChange = e => this.setState({ [e.target.name]: e.target.value}) // This can be used anywhere multiple times

    // ** This Method is Used to Submit the Search form **
    onSubmit = e => {
        e.preventDefault();
        if(this.state.text===''){
            this.props.setAlert('Please Enter a Username', 'light')
        }else{
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }

    render() {
        const { showClear, clearUsers } = this.props
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users" 
                    value={this.state.text}
                    onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block"></input>
                </form>
                {showClear && (
                <button onClick={clearUsers} className="btn btn-light btn-block">Clear</button>
                )}
            </div>
        )
    }
}

export default Search

