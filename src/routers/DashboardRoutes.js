import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { InventoryScreen } from "../components/inventory/inventoryScreen";
import { RecordsScreen } from "../components/historicos/recordsScreen";
import { ApartScreen } from "../components/apartos/ApartScreen";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRoutes = () => {
  return (
    <Router>
      <Sidebar />
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/inventario-vigente/:page?" component={InventoryScreen} />
            <Route exact path="/historicos" component={RecordsScreen} />
            <Route exact path="/apartos" component={ApartScreen} />
            <Redirect to="/inventario-vigente/:page?" />
          </Switch>
        </div>
      </main>
    </Router>
  );
};
