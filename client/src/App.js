import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/HomePage";
import Signup from "./pages/Home/SignupPage";
import Login from "./pages/Home/LoginPage";
import Dashboard from "./pages/Home/SuperAdmin";
import UserDashboard from "./pages/Home/UserDashboard";
import DoctorDashboard from "./pages/Home/DoctorDashboard";
import ReceptionDashboard from "./pages/Home/ReceptionDashboard";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/user" component={UserDashboard} />
            <Route path="/doctor" component={DoctorDashboard} />
            <Route path="/reception" component={ReceptionDashboard} />
          </Switch>
        </div>
      </Router>
    </BrowserRouter>
  );
}

export default App;
