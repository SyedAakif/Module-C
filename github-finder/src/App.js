import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User'
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import GithubState from './components/context/github/GithubContext'
import './App.css';
import About from './components/pages/About'
const App = () => {
  const [users , setUsers] = useState([]);
  const [user , setUser] = useState({});
  const [repos , setRepos] = useState([]);
  const [loading , setLoading] = useState(false);
  const [alert , setAlert] = useState(null)

  // ** Async Await is used when we not want to wait for the api to fetch data and the page do rest of the workxx **
  // async componentDidMount(){
  //   setState({loading:true}); // to update the state we use setState
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   setState( { users: res.data , loading:false } )
  // }


  // This Function is Called From the Search Component by passing props up


  // This Fucntion is called from the User Item Component to Display User Details from Github
  const getUser = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUser(res.data);
    setLoading(false);
  }

  // This function is called from the User to Display the latest Repos
  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data);
    setLoading(false);
  }

  // This Function is called from the Search  to clear the users from State
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
  // This function is called from Search Component to raise Alert for empty search
  const displayAlert = (msg,type) =>{
    setAlert({ msg,  type });
    // Remove Alert Message after the 3 Seconds
    setTimeout(() => setAlert(null),3000);
  }
  const removeAlert=()=>{
    setAlert(null);
  }

    return (
      <GithubState>
        <Router>
          <div className= 'App'>
            <Navbar />
            <div className="container"> 
              <Alert alert={alert} removeAlert={removeAlert}/>
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search
                            clearUsers= {clearUsers}
                            showClear={users.length > 0 ? true: false}
                            setAlert={displayAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                {/* Route for User Detail Pages */}
                <Route exact path='/user/:login' render={props => (
                  <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading}/>
                )} />  {/* to pass the Parameter in URL we use : and name */}
              </Switch>
              
            </div>
          </div>
        </Router>
      </GithubState>
    );
    // To Add Margins & Padding from left and right we use container Class here 
}

//
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

export default App;
