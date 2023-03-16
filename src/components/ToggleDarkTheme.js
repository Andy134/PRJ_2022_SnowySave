import { useContext } from "react";
import "../assets/toggleDarkTheme.css"
import { AppContext } from "../pages/Root";

export default function ToggleDarkTheme() {

    const {darkTheme, setDarkTheme} = useContext(AppContext);

    function handleChangeTheme() {
        setDarkTheme(!darkTheme)
    }

    return <div className="theme-switch">
        <input type="checkbox" className="checkbox" id="checkbox" onChange={handleChangeTheme} checked={!darkTheme}/>
        <label htmlFor="checkbox" className="checkbox-label">
            <span className="ball d-flex justify-content-center align-items-center">
            <img src ={`/assets/${darkTheme ?  'moon.png' : 'sunny.png'}`} alt="0"/>
            </span>
        </label>
  </div>
}