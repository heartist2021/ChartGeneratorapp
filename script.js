document.addEventListener('DOMContentLoaded', function() {
    const chartTypeSelector = document.getElementById('chartType');
    const chartTitleInput = document.getElementById('chartTitle');
    const labelNamesInput = document.getElementById('labelNames');
    const dataInput = document.getElementById('dataInput');
    const excelInput = document.getElementById('excelInput');
    const generateChartButton = document.getElementById('generateChart');
    const downloadChartButton = document.getElementById('downloadChart');
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    let chart;

    generateChartButton.addEventListener('click', function() {
        const selectedChartType = chartTypeSelector.value;
        const chartTitle = chartTitleInput.value;
        const labels = parseData(labelNamesInput.value).values;
        const data = parseData(dataInput.value);
        
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: selectedChartType,
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: data.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Show download button
        downloadChartButton.style.display = 'inline-block';
    });

    downloadChartButton.addEventListener('click', function() {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'chart.png';
        downloadLink.click();
    });

    function parseData(input) {
        // Parse comma-separated values
        const values = input.split(',').map(value => value.trim());
        return { values };
    }
});
