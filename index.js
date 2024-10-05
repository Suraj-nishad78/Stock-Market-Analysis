//import function from stockList.js for getting stock bookValue & profit
import{fetchStockValueProfit} from './stockList.js'

//import function from summary.js for getting the summary details & also update the detail section as per click event on button from list section
import{detailsUpdating,summaryFetchData} from './summary.js'

// Import function from chartData.js For getting chart data 
import{defaultStockChart} from './chartdata.js'


const Stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];

let listSection = document.getElementById('list-section');

// List Section Function
function listSectionForStock() {
    Stocks.forEach(stock => {
        let div = document.createElement('div');
        div.classList.add('list-item');
        div.id = stock;  // Unique ID based on stock symbol

        let button = document.createElement('button');
        button.id = `stock-btn-${stock}`
        button.textContent = stock;

        //event listener for summary details 
        button.addEventListener('click', function (event) {

            //import function from summary.js used here
            detailsUpdating(event,stock)
            summaryFetchData(stock)
            
            //import function from chartdata.js used here
            defaultStockChart(stock)
        })

        let span = document.createElement('span');
        span.classList.add('price');
        span.id = `stock-span${stock}`
        span.textContent = 'Fetching...';  // Placeholder for price
        
        let p = document.createElement('p');
        p.classList.add('profit');
        p.id = `stock-p-${stock}`
        p.textContent = 'Fetching...';  // Placeholder for profit
        
        div.append(button, span, p);
        listSection.appendChild(div);

        //import function from stockList.js used here
        // Fetch stock data for each stock 
        fetchStockValueProfit(stock);
      });
    }

listSectionForStock();





