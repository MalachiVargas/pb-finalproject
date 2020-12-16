import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({
    titleData,
    budgetData,
    monthData,
    backgroundColorData,
    token,
    getData,
    configureData,
    submitListener,
}) {
    let finalData = budgetData;
    let finalLabel = titleData;

    const monthlyViewMap = {};

    function aggregate(month, i) {
        if (!(month in monthlyViewMap)) {
            monthlyViewMap[month.toLowerCase()] = Number(budgetData[i]);
        } else {
            monthlyViewMap[month.toLowerCase()] += Number(budgetData[i]);
        }
    }

    if (configureData === 'monthly') {
        monthData.forEach(aggregate);

        const mvMonth = Object.keys(monthlyViewMap);

        const mvBudget = Object.values(monthlyViewMap);

        finalData = mvBudget;
        finalLabel = mvMonth;
    }

    const dataSource = {
        datasets: [
            {
                label: 'Money Spent',
                data: finalData,
                backgroundColor: backgroundColorData,
            },
        ],
        labels: finalLabel,
    };

    useEffect(() => {
        getData();
    }, [token, submitListener]);

    return (
        <div className="container">
            <h3>Expense by the Bar</h3>
            <Bar
                className="bar"
                data={dataSource}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    layout: {
                        padding: {
                            top: 20,
                            left: 15,
                            right: 15,
                            bottom: 10,
                        },
                    },
                }}
            />
        </div>
    );
}

export default BarChart;
