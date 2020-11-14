import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, two_factors_activated } = useSelector( state => state.auth );

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/acceso" 
                        component={ LoginScreen }
                        isAuthenticated={ !!two_factors_activated }
                    />

                    <PrivateRoute 
                        path="/" 
                        component={ DashboardRoutes } 
                        isAuthenticated={ !!two_factors_activated }
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
