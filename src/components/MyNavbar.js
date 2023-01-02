import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { authService } from "../service/auth.service";

export default function MyNavbar() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return navigate("/");
        // eslint-disable-next-line
    }, [user]);

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>SNOWY MONEY</Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"} aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"outcome"}>Outcome</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"income"}>Income</Link>
                        </li>
                    </ul>

                    <div className="nav-item dropdown">
                        <button className="btn btn-md dropdown-toggle" 
                            id="dropdownId" 
                            data-bs-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            {user?.email}
                        </button >
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <Link className="dropdown-item" >Action 1</Link>
                            <Link className="dropdown-item" >Action 2</Link>
                            <hr/>
                            <Link className="dropdown-item" onClick={authService.logout}>Log out</Link>
                        </div>
                    </div>
                    {/* <form className="d-flex my-2 my-lg-0">
                    <input className="form-control me-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
         </nav>
    </>
}