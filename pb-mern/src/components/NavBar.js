import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function NavBar({ isAuth, setAuth }) {
    const handleLogout = async () => {
        await axios
            .get('http://localhost:3000/logout', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((response) => {
                setAuth(response.data);
            });
    };
    return (
        <nav role="navigation">
            <div className="nav-wrapper white">
                <NavLink to="/" className="brand-logo black-text">
                    Personal Budget
                </NavLink>
                <ul className="right hide-on-med-and-down">
                    <li>
                        {isAuth ? (
                            <button
                                type="button"
                                className="waves-effect waves-light  blue-grey darken-3 btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                id="login"
                                to="/login"
                                className="waves-effect waves-light indigo lighten-1 btn"
                            >
                                Login
                            </NavLink>
                        )}
                    </li>
                    <li>
                        <NavLink
                            id="signup"
                            to="/signup"
                            className="waves-effect waves-light indigo lighten-1 btn"
                        >
                            Sign Up
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
