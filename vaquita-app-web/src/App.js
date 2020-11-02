import React from "react";
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
// componentes
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import InventariosVigentes from "./components/inventario_vigente/Inventarios_vigentes";
import Historicos from "./components/historicos/Historicos";
import Apartos from "./components/apartos/Apartos";
// rutas
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Sidebar/>
        <main>
          <div className="container">
              <Switch>
                <Route exact path="/" component={InventariosVigentes} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/listar/historicos" component={Historicos} />
                <Route exact path="/listar/apartos" component={Apartos} />
                
              </Switch>
          </div>
        </main>
        <footer>
          <Footer/> 
        </footer>
      </Provider>
    </Router>
  );
}

export default App;
