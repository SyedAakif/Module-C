import React, { useState, useContext} from 'react';
import PropTypes from 'prop-types';  // shortcut impt
import GithubContext from "../context/github/GithubContext"

const Search = ({ clearUsers,showClear,setAlert  }) => {

    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    // ** This Method is Used to dynamically update state whenever text input changes in the Search **
    // const onChange = e => this.setState({ [e.target.name]: e.target.value}) // This can be used anywhere multiple times
    
    const onChange = e => setText(e.target.value);

    // ** This Method is Used to Submit the Search form **
    const onSubmit = e => {
        e.preventDefault();
        if(text===''){
            setAlert('Please Enter a Username', 'light')
        }else{
            githubContext.searchUsers(text);
            setText('');
        }
    }
        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users" 
                    // value={this.state.text}
                    value={text}
                    // onChange={this.onChange}
                    onChange={onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block"></input>
                </form>
                {showClear && (
                <button onClick={clearUsers} className="btn btn-light btn-block">Clear</button>
                )}
            </div>
        )
}

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search

