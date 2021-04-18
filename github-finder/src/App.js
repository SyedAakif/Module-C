import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import User from './components/users/User'
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import './App.css';
import About from './components/pages/About'



class App extends Component{
  state ={
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // ** Async Await is used when we not want to wait for the api to fetch data and the page do rest of the workxx **
  // async componentDidMount(){
  //   this.setState({loading:true}); // to update the state we use setState
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState( { users: res.data , loading:false } )
  // }


  // This Function is Called From the Search Component by passing props up
  searchUsers = async (text) => {
    this.setState({loading:true}); // to update the state we use setState
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { users: res.data.items , loading:false } )
  }

  // This Fucntion is called from the User Item Component to Display User Details from Github
  getUser = async (username) => {
    this.setState({loading:true}); // to update the state we use setState
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { user: res.data, loading:false } )
  }

  // This function is called from the User to Display the latest Repos
  getUserRepos = async (username) => {
    this.setState({loading:true}); // to update the state we use setState
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState( { repos: res.data, loading:false } )
  }

  // This Function is called from the Search  to clear the users from State
  clearUsers = () => this.setState({ users: [], loading: false }) 

  // This function is called from Search Component to raise Alert for empty search
  setAlert = (msg,type) =>{
    this.setState({ alert: { msg,  type } })
    // Remove Alert Message after the 3 Seconds
    setTimeout(() => this.setState({alert: null}),2000)
  }
  removeAlert=()=>{
    this.setState({alert:null});
  }
  render(){
    const { users, user , repos , loading } = this.state
    return (
      <Router>
        <div className= 'App'>
          <Navbar />
          <div className="container"> 
            <Alert alert={this.state.alert} removeAlert={this.removeAlert}/>
            <Switch>
              <Route exact path='/' render={ props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} 
                          clearUsers= {this.clearUsers}
                          showClear={ users.length > 0 ? true: false  }
                          setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              {/* Route for User Detail Pages */}
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading}/>
              )} />  {/* to pass the Parameter in URL we use : and name */}
            </Switch>
            
          </div>
        </div>
      </Router>
    );
    // To Add Margins & Padding from left and right we use container Class here 
  }
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
