
// Fetch Stock Value & profit
function fetchStockValueProfit(stock) {
    fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata')
        .then((res) => res.json())
        .then((data) => {
            stockData(data.stocksStatsData[0], stock);
            defaultDetailStock(data.stocksStatsData[0], 'AAPL');
        })
        .catch((error) => console.log("Error fetching stock data: ", error));
}

// Function to map fetched data to each stock
function stockData(stockValueProfit, stock) {
    let stockInfo = stockValueProfit[stock]
    if (stockInfo) {
        let stockDiv = document.getElementById(stock);  // Use unique stock ID
        if (stockDiv) {
            let priceSpan = stockDiv.querySelector('.price');
            let profitP = stockDiv.querySelector('.profit');

            // Update with actual data
            priceSpan.textContent = `$${stockInfo.bookValue}`;
            profitP.textContent = `${stockInfo.profit.toFixed(2)}%`;
            if(stockInfo.profit == 0){
                profitP.style.color = 'red'
            }
        }
    } else {
        console.warn(`No data found for stock: ${stock}`);
    }
}

// Default function for update the detail section 
function defaultDetailStock(stock,stockDefault){
    let defaultStockValues = stock[stockDefault]
  document.getElementById('stock-name').textContent = stockDefault  
  document.getElementById('stock-profit').textContent = `${defaultStockValues.profit}%` 
  document.getElementById('stock-value').textContent =  `$${defaultStockValues.bookValue}`
}

// calling the function 
document.addEventListener('DOMContentLoaded',()=>{
    fetchStockValueProfit()    
})
// Exporting function to the main file
export{fetchStockValueProfit}


