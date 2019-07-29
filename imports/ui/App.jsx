import React from 'react';
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
//COMPONENTS STUFF
import Info from './Info.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Details from './Details.jsx'
import PhotoList from './PhotoList.jsx';
import SubmitPhoto from './SubmitPhoto.jsx'

const App = () => {
  return(
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={ PhotoList } />
        <Route exact path="/info" component={ Info } />
        <Route exact path="/newEntry" component={ SubmitPhoto } />
        <Route exact path="/details/:id" component={ Details } />
      </Switch>
      <Footer/>
    </div>
  )
};


export default App;
