import React from 'react';
import '../App.css';

const Login = () =>{
    return (
        <div className="row">
            <div className="col s2">

            </div>
            <div className="col s8 center-align">
                <div className="card">
                    <div className="card-action red white-text">
                        <h3>Login</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-field center-align">
                            <button className="btn-large red"><i class="fab fa-google"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col s2">

            </div>
        </div>
    )
}
export default Login;