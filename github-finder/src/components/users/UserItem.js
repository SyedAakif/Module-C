import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
// ******************* @@@@@@@ ****************
//  ***  Funtional Stateless Component ***
//  Saying it stateless because we are not using any state in this
// ******************** @@@@@@@ ****************

//  const UserItem = (props) => {
            
//         // ******************* @@ ****************
//         // ** dE-sTRUCTURING OF CODE OR TO REMOVE this.state to use every time **
//         // Destructuring: Destructuring is a convenient way of accessing multiple properties stored in objects and arrays.
//         // ******************* @@ *****************
//     const { login, avatar_url, html_url } = props.user
const UserItem = ({user: { login, avatar_url, html_url }}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} alt="Profile" className="round-img" style={{ width: '60px'}}/>
            <h3>{login}</h3>
            <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">Profile</Link>
        </div>
    )    
}

UserItem.prototype = {
    user: PropTypes.object.isRequired,

}




 // *********************** @@@@@ ****************
// *** CLASS Componets With States and Props which is Old way ***
// ************************ @@@@@ *****************

// import React, { Component } from 'react'

// class UserItem extends Component {
//     // state = {
//     //     id: '1',
//     //     login: 'mojombo',
//     //     avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
//     //     html_url: 'https://github.com/mojombo'
//     // };

//     // ****  OLD Method to use State **** 

//     // constructor(){
//     //     super();  // This is used to make the object of parent class in child class
//     //     this.state = {
//     //         id: '1',
//     //         login: 'mojombo',
//     //         avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
//     //         html_url: 'https://github.com/mojombo'
//     //     }
//     // }



//     render() {
            
            // ******************* @@ ****************
//         // ** dE-sTRUCTURING OF CODE OR TO REMOVE this.state to use every time **
//         // Destructuring: Destructuring is a convenient way of accessing multiple properties stored in objects and arrays.
            // ******************* @@ *****************
//         const { login, avatar_url, html_url } = this.props.user
        
//         return (
//             <div className="card text-center">
//                 <img src={avatar_url} alt="Profile" className="round-img" style={{ width: '60px'}}/>
//                 <h3>{login}</h3>
//                 <a href={html_url} className="btn btn-dark btn-sm my-1">Profile</a>
//             </div>
//         )
//     }
// }

export default UserItem
