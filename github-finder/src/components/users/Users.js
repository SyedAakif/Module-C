import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

// class Users extends Component {
    // state = {
    //     users: [
    //         {
    //             id: '1',
    //             login: 'mojombo',
    //             avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         },
    //         {
    //             id: '2',
    //             login: 'defunkt',
    //             avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    //             html_url: 'https://github.com/defunkt'
    //         },
    //         {
    //             id: '3',
    //             login: 'pjhyett',
    //             avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
    //             html_url: 'https://github.com/pjhyett'
    //         },
    //     ]
    // }
const Users = ({ users, loading }) => {

    // Check if Loading or Not and return spinner or userItem
    if (loading){
        return < Spinner />
        
    }else{
        return (
            <div style={userStyle}>
                    {/* {this.state.users.map(user => {  */}
                    {users.map(user => {
                    return(
                    <UserItem key={user.id} user={user} />
                    )
                })}
            </div>
        )
    }   
}

Users.propTypes = {
    users: PropTypes.array.isRequired, // Shortcut=ptar
    loading: PropTypes.bool.isRequired, // shortcut = ptbr
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users
