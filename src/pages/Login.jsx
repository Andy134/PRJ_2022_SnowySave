import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { authService } from "../service/auth.service";
import Loading from "../components/Loading";
import "./../assets/Login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (user) navigate("/dashboard");
    // eslint-disable-next-line  
    }, [user]);
    return (<>
        {loading  && <Loading/>}
        {loading || <div className="login">
            <div className="login__container">
            <input
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
            />
            <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button
                className="login__btn"
                onClick={() => authService.logInWithEmailAndPassword(email, password)}
            >
                Login
            </button>
            <div>
                <Link to="/reset">Forgot Password</Link>
            </div>
            <div>
                Don't have an account? <Link to="/register">Register</Link> now.
            </div>
            </div>
        </div>}
      </>
    );
  }
  export default Login;