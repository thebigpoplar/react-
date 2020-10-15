import React from 'react'
// import {BrowserRouter as Router,Switch, Route} from "react-router-dom" 相当于vue-router的history
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"//相当于vue-router中的hash
import Login from './layout/Login'
import Index from './layout/Index'
import { getStorage } from './utils/storage'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={Index} /> */}
        <Route path="/" render = { () => { // 在本地储存判断是登录还是未登录的状态
          return getStorage('loginStart') === 'true' ? <Index/> : <Redirect to="/login"/>
          //  if (getStorage('loginStart') === 'true') { return <Index/>} else { return <Redirect to="/login"/>} 
        }} />
      </Switch>
    </Router>
  );
}

export default App;
