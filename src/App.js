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
      <AppNavBar />

      <Switch>
        <Route path="/create-policy">
          <PolicyUpsert />
        </Route>

        <Route path="/list-policy">
          <PolicyList />
        </Route>

        <Route exact path="/">
          <PolicyList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
