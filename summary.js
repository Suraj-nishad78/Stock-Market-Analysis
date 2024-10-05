//Summary Details
let stockName = document.getElementById('stock-name')
let stockProfit = document.getElementById('stock-profit')
let stockValue = document.getElementById('stock-value')

let stockPara = document.getElementById('stock-para')

//Details updating as per event
function detailsUpdating(event,stockSymbol){
    fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata')
    .then((res)=>res.json())
    .then((data)=>detailsUpdated(data.stocksStatsData[0],stockSymbol))
    .catch((err)=>console.warn('error occured:', err))
}

//Details Updated 
 function detailsUpdated(stockDetails,stock){
    // summaryFetchData(stock)
    let stockInform = stockDetails[stock]
    if(stockInform){
        stockName.textContent = stock;
        stockValue.textContent = `$${stockInform.bookValue}`;
        stockProfit.textContent = `${stockInform.profit}%`
        if(parseFloat(stockInform.profit)== 0){
            stockProfit.style.color = 'red'
        } else {
            stockProfit.style.color = 'green'
        }
    } else {
        console.warn(`No data found for stock: ${stock}`);
    }
    //calling the function summary update
}

//summary data fetching
 function summaryFetchData(summary){
    fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata')
    .then((res)=>res.json())
    .then((data)=> summaryUpdated(data.stocksProfileData[0],summary))
    .catch((error)=>console.warn('error found:',error))
}

//summary updated 
 function summaryUpdated(summaryData,stock){
    let summaryInfo = summaryData[stock]
    if(summaryInfo){
        stockPara.textContent = summaryInfo.summary;
    } else {
        console.warn(`No data found for stock Summary: ${stock}`);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    summaryFetchData('AAPL')
})


export{detailsUpdating,summaryFetchData}