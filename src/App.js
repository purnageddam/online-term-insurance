import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { PolicyList } from "./components/PolicyList";
import { PolicyUpsert } from "./components/PolicyUpsert";
import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";

function App() {
  return (
    <Router>
      <div className="sticky-top">
        <AppNavBar />
      </div>

      <Switch>
        <Route path="/create-policy">
          <PolicyUpsert />
        </Route>

        <Route path="/list-policy">
          <PolicyList />
        </Route>
        <div
          className="row"
          style={{
            height: "100vh",
            fontSize: "50px",
            backgroundColor: "#d9ecd0",
          }}
        >
          <div className="col d-flex justify-content-center align-items-center">
            <Route exact path="/">
              Welcome To Policy Module
            </Route>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
