import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

export default function Root() {
    return (
      <div id="sm-app">
        <MyNavbar/>
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
  }