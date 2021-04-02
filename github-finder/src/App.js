import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import Users from './components/users/Users';
import axios from 'axios';

class App extends Component{
  state ={
    users: [],
    loading: false
  }

  // Async Await is used when we not want to wait for the api to fetch data and the page do rest of the workxx
  async componentDidMount(){
    this.setState({loading:true}); // to update the state we use setState
    const res = await axios.get('https://api.github.com/users')
    this.setState( { users: res.data , loading:false } )
  }



    render(){
    return (
      <div className= 'App'>
        <Navbar />
        <div className="container"> 
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
        
      </div>
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
