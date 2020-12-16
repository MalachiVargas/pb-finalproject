import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import jwt from 'jwt-decode';
import generateColor from '../../generateColor';
import TabNav from '../TabNav';
import Tab from '../Tab';
import PieChart from '../tabs/PieChart';
import BarChart from '../tabs/BarChart';
import LineChart from '../tabs/LineChart';

function Dashboard({
    token,
    budgetData,
    titleData,
    backgroundColorData,
    monthData,
    getData,
    getAuth,
    isAuth,
}) {
    M.AutoInit();
    const toastHTML =
        '<span>You are about to be logged out</span><button id="toast-button" class="btn-flat toast-action">Refresh</button>';
    const [dashDetails, setDashDetails] = useState({
        selected: 'PieChart',
        configureData: 'category',
        submitListener: true,
        title: '',
        budget: '',
        month: '',
    });

    const setSelected = (tab) => {
        setDashDetails({
            ...dashDetails,
            selected: tab,
        });
    };

    const { title, month, budget, configureData, submitListener } = dashDetails;

    // eslint-disable-next-line no-unused-vars

    const getRefresh = async () => {
        await axios
            .get('http://localhost:3000/refresh', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((response) => {
                if (response) {
                    getAuth();
                }
            });
    };

    const handleRefresh = () => {
        M.Toast.dismissAll();
        getRefresh();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const titleError = document.querySelector('.helper-text.title');
        const budgetError = document.querySelector('.helper-text.budget');
        const monthError = document.querySelector('.helper-text.month');

        const titleDoc = document.querySelector('#title');
        const budgetDoc = document.querySelector('#budget');
        const monthDoc = document.querySelector('#month');

        titleError.textContent = '';
        budgetError.textContent = '';
        monthError.textContent = '';

        const { userId } = jwt(token);
        const backgroundColor = generateColor();

        const body = {
            title,
            budget,
            month,
            userId,
            backgroundColor,
        };

        setDashDetails({
            ...dashDetails,
            titleData: '',
            budgetData: '',
            monthData: '',
        });

        titleDoc.value = '';
        budgetDoc.value = '';
        monthDoc.value = '';

        axios
            .post('http://localhost:3000/budget', JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then(() => {
                setDashDetails({
                    ...dashDetails,
                    submitListener: !submitListener,
                });
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    titleError.textContent = error.response.data.errors.title;
                    budgetError.textContent = error.response.data.errors.budget;
                    monthError.textContent = error.response.data.errors.month;
                }
            });
    };

    const handleDelete = () => {
        axios
            .delete('http://localhost:3000/budget1', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                setDashDetails({
                    ...dashDetails,
                    submitListener: !submitListener,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleDeleteAll = () => {
        axios
            .delete('http://localhost:3000/budget', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                setDashDetails({
                    ...dashDetails,
                    submitListener: !submitListener,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setDashDetails({ ...dashDetails, [e.target.id]: e.target.value });
    };

    const handleClick = (e) => {
        setDashDetails({ ...dashDetails, configureData: e.target.name });
    };

    const { selected } = dashDetails;

    function launchToast() {
        setTimeout(() => {
            M.toast({ html: toastHTML });
            const tb = document.querySelector('#toast-button');
            tb.onclick = handleRefresh;
        }, 40000);
    }

    function authTime() {
        setTimeout(() => {
            getAuth();
        }, 60010);
    }

    useEffect(() => {
        if (isAuth) {
            launchToast();
            authTime();
        }

        return () => {
            clearTimeout(launchToast);
            clearTimeout(authTime);
        };
    }, [isAuth]);

    return (
        <main className="body center">
            <h1 className="center-align" id="dashboard-h1">
                Welcome to the Dashboard
            </h1>
            <section className="section container z-depth-3" id="chart-section">
                <TabNav
                    tabs={['PieChart', 'BarChart', 'LineChart']}
                    selected={selected}
                    setSelected={setSelected}
                >
                    <Tab isSelected={selected === 'PieChart'}>
                        <PieChart
                            titleData={titleData}
                            budgetData={budgetData}
                            monthData={monthData}
                            backgroundColorData={backgroundColorData}
                            getData={getData}
                            token={token}
                            configureData={configureData}
                            submitListener={submitListener}
                        />
                    </Tab>

                    <Tab isSelected={selected === 'BarChart'}>
                        <BarChart
                            titleData={titleData}
                            budgetData={budgetData}
                            monthData={monthData}
                            backgroundColorData={backgroundColorData}
                            getData={getData}
                            token={token}
                            configureData={configureData}
                            submitListener={submitListener}
                        />
                    </Tab>
                    <Tab isSelected={selected === 'LineChart'}>
                        <LineChart
                            titleData={titleData}
                            budgetData={budgetData}
                            monthData={monthData}
                            backgroundColorData={backgroundColorData}
                            getData={getData}
                            token={token}
                            configureData={configureData}
                            submitListener={submitListener}
                        />
                    </Tab>
                </TabNav>
                {configureData !== 'category' ? (
                    <button
                        className="configure waves-effect waves-light indigo lighten-1 btn"
                        id="configure-type-button"
                        name="category"
                        type="button"
                        onClick={handleClick}
                    >
                        Category View
                    </button>
                ) : (
                    <button
                        className="configure waves-effect waves-light indigo lighten-1 btn"
                        id="configure-type-button"
                        name="monthly"
                        type="button"
                        onClick={handleClick}
                    >
                        Monthly View
                    </button>
                )}
            </section>
            <div className="container form">
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Title"
                            className="col s6"
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="helper-text title"
                            data-error="wrong"
                            data-success="right"
                        />
                    </div>

                    <div className="input-field">
                        <input
                            type="text"
                            name="budget"
                            id="budget"
                            placeholder="Expense"
                            className="col s6"
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="helper-text budget"
                            data-error="wrong"
                            data-success="right"
                        />
                    </div>

                    <div className="input-field">
                        <input
                            type="text"
                            name="month"
                            id="month"
                            placeholder="Month"
                            className="col s6"
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="helper-text month"
                            data-error="wrong"
                            data-success="right"
                        />
                    </div>
                    <button
                        className="waves-effect waves-light indigo lighten-1 btn"
                        id="submit-type-button"
                        type="submit"
                    >
                        Add an Expense
                    </button>
                </form>
            </div>
            {budgetData.length > 0 ? (
                <div>
                    <div>
                        <button
                            className="waves-effect waves-light indigo lighten-1 btn"
                            id="delete-button"
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete Last Expense
                        </button>
                    </div>
                    <div>
                        <button
                            className="waves-effect waves-light indigo lighten-1 btn"
                            id="delete-all-button"
                            type="button"
                            onClick={handleDeleteAll}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            ) : (
                <div />
            )}
        </main>
    );
}

export default Dashboard;
