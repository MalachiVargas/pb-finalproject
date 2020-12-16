import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({
    titleData,
    budgetData,
    monthData,
    backgroundColorData,
    token,
    configureData,
    getData,
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
                borderColor: backgroundColorData,
            },
        ],
        labels: finalLabel,
    };

    useEffect(() => {
        getData();
    }, [token, configureData, submitListener]);

    return (
        <div className="container">
            <h3>Expense by Area</h3>
            <Line
                className="line"
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

export default LineChart;
