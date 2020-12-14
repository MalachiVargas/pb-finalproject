import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
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
}) {
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
            selected: tab,
        });
    };

    const { title, month, budget, configureData, submitListener } = dashDetails;

    const handleSubmit = (e) => {
        e.preventDefault();

        const titleError = document.querySelector('.helper-text.title');
        const budgetError = document.querySelector('.helper-text.budget');
        const monthError = document.querySelector('.helper-text.month');
        titleError.textContent = '';
        budgetError.textContent = '';
        monthError.textContent = '';

        const generateColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i += 1) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const { userId } = jwt(token);
        const backgroundColor = generateColor();

        const body = {
            title,
            budget,
            month,
            userId,
            backgroundColor,
        };

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

    const handleChange = (e) => {
        setDashDetails({ ...dashDetails, [e.target.id]: e.target.value });
    };

    const handleClick = (e) => {
        console.log(e.target.name);
        setDashDetails({ ...dashDetails, configureData: e.target.name });
        console.log(configureData);
    };

    const { selected } = dashDetails;

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
                            placeholder="Budget"
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
                        Add a Budget
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Dashboard;
