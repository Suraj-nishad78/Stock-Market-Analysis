

// Chart Section

let chartRef = null;
let term;

let timePeriodButtons = document.querySelectorAll('#timeStamp-btn button');
timePeriodButtons.forEach(button => {
  button.addEventListener('click', function () {
    let timeId = button.id;  // e.g., '1mo', '3mo', '1y', '5y'
    let stockName = document.getElementById('stock-name').textContent;  // Get the currently displayed stock
    timeStampbtn(stockName, timeId);  // Update the chart with the selected stock and time period
  });
});

// function that remove exixted chart & call the new chart according to the stock name & button id 
  function timeStampbtn(stock,timeId){
    if(chartRef){
      chartRef.destroy();
    }
    term = timeId
    getStockData(stock, term)
  }

//   fethching chart data 
  function getStockData(st, timeTerm){
    fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    .then((res)=>res.json())
    .then((data)=>{
      let value = data.stocksData[0][st][timeTerm].value;
      let labels = data.stocksData[0][st][timeTerm].timeStamp;
      labels = labels.map((timeStamp)=> new Date(timeStamp * 1000).toLocaleDateString());
      drawChart(value, labels, st)
        updateStockExtrems(data.stocksData[0][st][timeTerm])
    })
    .catch((error)=>console.log(error))
  }

  function drawChart(data, labels, stockName) {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    const padding = 0; // Adjust padding as needed
    const chartHeight = canvas.height - 100;
    const chartWidth = canvas.width - 100;
    const dataMax = Math.max(...data);
    const dataMin = Math.min(...data);
    const dataRange = dataMax - dataMin;
    const dataStep = dataRange > 0 ? chartHeight / dataRange : 0;
    const stepX = (chartWidth - 2 * padding) / (data.length - 1);

    // Draw the chart
    function drawChartLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the main chart line
        ctx.beginPath();
        ctx.moveTo(padding, chartHeight - (data[0] - dataMin) * dataStep);
        for (let i = 1; i < data.length; i++) {
            ctx.lineTo(padding + i * stepX, chartHeight - (data[i] - dataMin) * dataStep);
        }
        ctx.strokeStyle = '#39FF14';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the dotted horizontal line for value 0
        ctx.beginPath();
        ctx.setLineDash([2, 2]);
        const zeroY = chartHeight - (0 - dataMin) * dataStep;
        ctx.moveTo(padding, zeroY);
        ctx.lineTo(canvas.width - padding, zeroY);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        ctx.setLineDash([]); // Reset the line dash
    }

    drawChartLines();

    // Show tooltip and x-axis value on hover
    const tooltip = document.getElementById('tooltip');
    const xAxisLabel = document.getElementById('xAxisLabel');

    canvas.addEventListener('mousemove', (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        const dataIndex = Math.min(Math.floor((x - padding) / stepX), data.length - 1); // Adjust for padding
        const stockValue = data[dataIndex].toFixed(2);
        const xAxisValue = labels[dataIndex];

        tooltip.style.display = 'block';
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - 20}px`;
        tooltip.textContent = `${stockName}: $${stockValue}`;

        xAxisLabel.style.display = 'block';
        xAxisLabel.style.fontSize = '15px';
        xAxisLabel.style.fontWeight = 'bolder';
        xAxisLabel.style.left = `${x}px`;
        xAxisLabel.textContent = xAxisValue;

        // Draw vertical line and data point on hover
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawChartLines();
        
        // Draw a vertical line at the current x position when hovering over the chart
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, chartHeight);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        // Draw the data point as a bolder ball
        ctx.beginPath();
        ctx.arc(padding + dataIndex * stepX, chartHeight - (data[dataIndex] - dataMin) * dataStep, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#39FF14';
        ctx.fill();
    });

    canvas.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
        xAxisLabel.style.display = 'none';
        drawChartLines(); // Redraw the chart without the tooltip
    });
}


/*---------------------------------------*/
function updateStockExtrems(chartStockExtremes){
    const peakValue = Math.max(...chartStockExtremes.value);
    const lowValue = Math.min(...chartStockExtremes.value);

    // Update the DOM elements with the peak and low values
    document.getElementById('peak-value').textContent = `Peak: $${peakValue.toFixed(2)}`;
    document.getElementById('low-value').textContent = `Low: $${lowValue.toFixed(2)}`;
}

// function will work when list-item button click then update the chart data 
function defaultStockChart(stock){
    if(chartRef){
        chartRef.destroy();
    }
    getStockData(stock, '1mo');
}


// Fetch default stock data for the default chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
  defaultStockChart('AAPL')
});

export{defaultStockChart}