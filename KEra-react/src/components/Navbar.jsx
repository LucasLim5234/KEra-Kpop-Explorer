import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import appLogo from "../assets/images/appLogo.png";

export default function Navbar({ role, onClickLogout }) {

    return (
        <nav className="navbar navbar-expand-lg user-navbar-theme px-4">
            <NavLink className="navbar-brand fw-bold mx-5 user-navbar-logo" to="/user/idol-index">
                <img
                    src={appLogo}
                    alt="KEra logo"
                    height="50"
                    className="d-inline-block align-text-top"
                />
                <span className="ms-2 kpop-navbar-title">KEra</span>
            </NavLink>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#userNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="userNavbar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {role === "user" && <>
                        <li className="nav-item ms-5">
                            <NavLink className="nav-link user-navbar-link" to="/user/idol-index">
                                Idol Archive
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link user-navbar-link" to="/user/tour-index">
                                World Tour
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link user-navbar-link" to="/user/fan-index">
                                Fan Zone
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link user-navbar-link" to="/user/quiz-index">
                                Quiz Beat
                            </NavLink>
                        </li></>
                    }
                    {role === "admin" && <>
                        <li className="nav-item ms-5">
                            <NavLink className="nav-link user-navbar-link" to="/admin/idol-index">
                                Idol Archive
                            </NavLink>
                        </li>
                        {/* Admin does not need to do with World Tour as concerts are fetched from external API */}
                        {/* <li className="nav-item mx-3">
                            <NavLink className="nav-link" to="/user/world-tour">
                                World Tour
                            </NavLink>
                        </li> */}
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link user-navbar-link" to="/user/fan-index">
                                Fan Zone
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link user-navbar-link" to="/user/quiz-index">
                                Quiz Beat
                            </NavLink>
                        </li></>
                    }
                </ul>

                <button className="btn btn-danger btn-sm" onClick={onClickLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    role: PropTypes.string,
    onClickLogout: PropTypes.func,
};