const apikey = "da0d80ca1d82e026bcad96ca";

async function fetchCurrencies() {
  try{
    const response = await fetch (`https://v6.exchangerate-api.com/v6/${apikey}/codes`);
    const data = await response.json();
    populateCurrencyOptions(data.supported_codes);
  } catch (error){
    console.error("error fetching currency codes", error);
  }
  
}

//function to populate the currency 
function populateCurrencyOptions(codes){
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  codes.forEach(code => {
    const optionFrom = document.createElement("option")
    optionFrom.value = code [0];
    optionFrom.textContent = `${code[1]} (${code[0]})`;
    fromCurrency.appendChild(optionFrom);

    const optionTo = optionFrom.cloneNode(true);
    toCurrency.appendChild(optionTo);
  });
}

//fetch and populate currency options
fetchCurrencies();

document.getElementById("convertBtn").addEventListener("click", convertCurrency);

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  
  if (amount === "" || isNaN(amount)) {
    alert("please enter a valid amount.");
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apikey}/pair/${fromCurrency}/${toCurrency}/${amount}`

  try{
    const response = await fetch (url)
    const data = await response.json();
    displayResult(data.conversion_result);
  } catch (error){
    console.error("error fetching conversion rate", error);
  }
}

function displayResult(result) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Converted amount: ${result}`;
}
