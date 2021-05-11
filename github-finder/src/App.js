import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import Home from './components/pages/Home';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/alert/AlertState';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound'

const App = () => {

  // ** Async Await is used when we not want to wait for the api to fetch data and the page do rest of the workxx **
  // async componentDidMount(){
  //   setState({loading:true}); // to update the state we use setState
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GIHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   setState( { users: res.data , loading:false } )
  // }
  
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className= 'App'>
              <Navbar />
              <div className="container"> 
                <Alert />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/user/:login' component={User}/>  {/* to pass the Parameter in URL we use : and name */}
                  <Route component={NotFound} />
                </Switch>
                
              </div>
            </div>
          </Router>
        </AlertState>  
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
