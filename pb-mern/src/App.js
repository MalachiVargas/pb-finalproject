import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Homepage from './components/pages/Homepage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

import 'materialize-css/dist/css/materialize.min.css';
import './App.scss';

function App() {
    const [authData, setAuthData] = useState({
        isAuth: '',
        token: '',
    });

    const [chartData, setChartData] = useState({
        title: [],
        budget: [],
        backgroundColor: [],
        month: [],
    });

    const getData = () => {
        axios
            .get('http://localhost:3000/budget', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((res) => {
                setChartData({
                    ...chartData,
                    title: res.data.map((data) => {
                        return data.title;
                    }),
                    budget: res.data.map((data) => {
                        return data.budget;
                    }),
                    backgroundColor: res.data.map((data) => {
                        return data.backgroundColor;
                    }),
                    month: res.data.map((data) => {
                        return data.month;
                    }),
                });
            });
    };

    const getAuth = () => {
        axios
            .get('http://localhost:3000/isUserAuth', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then(async (response) => {
                await setAuthData({
                    isAuth: response.data.isAuth,
                    token: response.data.token,
                });
                console.log(authData);
                console.log(response.data);
            });
    };

    const setAuth = (authDetails) => {
        setAuthData({
            isAuth: authDetails.isAuth,
            token: authDetails.token,
        });
    };

    const { isAuth, token } = authData;

    useEffect(() => {
        // nothing
    }, [isAuth]);

    const { title, budget, month, backgroundColor } = chartData;

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    isAuth={isAuth}
                    token={token}
                    getAuth={getAuth}
                    setAuth={setAuth}
                />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route
                        exact
                        path="/signup"
                        render={() => (
                            <Signup
                                token={token}
                                isAuth={isAuth}
                                setAuth={setAuth}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => (
                            <Login
                                token={token}
                                isAuth={isAuth}
                                setAuth={setAuth}
                            />
                        )}
                    />
                    {isAuth ? (
                        <Route
                            exact
                            path="/dashboard"
                            render={() => (
                                <Dashboard
                                    token={token}
                                    isAuth={isAuth}
                                    titleData={title}
                                    budgetData={budget}
                                    monthData={month}
                                    backgroundColorData={backgroundColor}
                                    getData={getData}
                                    getAuth={getAuth}
                                />
                            )}
                        />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
