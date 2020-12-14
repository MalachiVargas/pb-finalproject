import React from 'react';
import { NavLink } from 'react-router-dom';

function HomePage() {
    return (
        <main className="body center">
            <div className="container">
                <img
                    className="left"
                    src="/personal-finance.svg"
                    height="350px"
                    alt="cover"
                    size="large"
                />
                <div className="section">
                    <h1>Personal Budgets</h1>
                    <h2>Take your savings personally.</h2>
                    <NavLink
                        to="/dashboard"
                        className="waves-effect waves-light indigo lighten-1 btn"
                    >
                        View Budgets
                    </NavLink>
                </div>
            </div>
        </main>
    );
}

export default HomePage;
