import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { InventoryScreen } from "../components/inventory/inventoryScreen";
import { Historicos } from "../components/historicos/Historicos";
import { Apartos } from "../components/apartos/Apartos";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/inventario-vigente" component={InventoryScreen} />
            <Route exact path="/historicos" component={Historicos} />
            <Route exact path="/apartos" component={Apartos} />
            <Redirect to="/inventario-vigente" />
          </Switch>
        </div>
      </main>
    </Router>
  );
};
