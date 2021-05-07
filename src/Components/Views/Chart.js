import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';

function Chart() {
    const actions = [
        {
            name: 'Position: average',
            handler(chart) {
                chart.options.plugins.tooltip.position = 'average';
                chart.update();
            }
        },
        {
            name: 'Position: nearest',
            handler(chart) {
                chart.options.plugins.tooltip.position = 'nearest';
                chart.update();
            }
        },
        {
            name: 'Position: bottom (custom)',
            handler(chart) {
                chart.options.plugins.tooltip.position = 'bottom';
                chart.update();
            }
        },
    ];
    const [chartData, setChartData] = useState({
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        actions: actions,
        
        datasets: [
            {
                label: 'Population',
                data: [
                    617594,
                    181045,
                    153060,
                    106519,
                    105162,
                    95072
                ],

                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth: 5,
                borderColor: '#777',
                pointBackgroundColor: '#fff',
                // hoverBorderWidth: 20,
                // hoverBorderColor: '#000',
            }
        ]
    });

    return (
        <div>
            <Line
                data={chartData}
                height={400}
                options={{
                    maintainAspectRatio: false,
                    elements: {
                        point:{
                            radius: 0
                        }
                    },
                    tooltips: {
                        position: "average"
                    },
                    
                }, actions}
            />
        </div>
    )
}

export default Chart;
