import React from 'react';
import { Switch, Route } from 'react-router-dom'
//COMPONENTS STUFF
import Info from './Info.jsx';
import Login from './Login.jsx'
import Header from './Header.jsx';
import SignUp from './SignUp.jsx'
import Footer from './Footer.jsx';
import Details from './Details.jsx'
import PhotoList from './PhotoList.jsx';
import SubmitPhoto from './SubmitPhoto.jsx'

const App = () => {
  return(
    <div>
      <Header/>
      <div style={{ padding: '16px' }}>
        <Switch>
          <Route exact path="/" component={ PhotoList } />
          <Route exact path="/info" component={ Info } />
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/newEntry" component={ SubmitPhoto } />
          <Route exact path="/details/:id" component={ Details } />
        </Switch>
      </div>
      <Footer/>
    </div>
  )
};


export default App;
