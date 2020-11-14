import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { InventariosVigentes } from "../components/inventario_vigente/Inventarios_vigentes";
import { Historicos } from "../components/historicos/Historicos";
import { Apartos } from "../components/apartos/Apartos";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRoutes = () => {
  return (

    <Router>
        <Sidebar/>
        <main>
          <div className="container">
              <Switch>
                <Route exact path="/" component={InventariosVigentes} />
                <Route exact path="/historicos" component={Historicos} />
                <Route exact path="/apartos" component={Apartos} />
                <Redirect to="/" />
              </Switch>
          </div>
        </main>
    </Router>
  );
};
