const apikey = "da0d80ca1d82e026bcad96ca";

// This function fetches the supported currency codes from the API
async function fetchCurrencies() {
  try{
    const response = await fetch (`https://v6.exchangerate-api.com/v6/${apikey}/codes`);
    const data = await response.json();
    populateCurrencyOptions(data.supported_codes);
  } catch (error){
    console.error("error fetching currency codes", error);
  }
  
}


// This function populates the "fromCurrency" and "toCurrency" dropdowns with available currency options
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


// Call the fetchCurrencies function to populate the currency options when the page loads
fetchCurrencies();
// Event listener for the "convert" button to trigger the conversion when clicked
document.getElementById("convertBtn").addEventListener("click", convertCurrency);

// This function handles the currency conversion based on user input
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  
  // Validate user input to ensure it's a valid amount
  if (amount === "" || isNaN(amount)) {
    alert("please enter a valid amount.");
    return;
  }
  // Construct the URL for the API request to fetch the conversion rate
  const url = `https://v6.exchangerate-api.com/v6/${apikey}/pair/${fromCurrency}/${toCurrency}/${amount}`

  try{
    const response = await fetch (url)
    const data = await response.json();
    displayResult(data.conversion_result);
  } catch (error){
    console.error("error fetching conversion rate", error);
  }
}
// This function displays the converted amount
function displayResult(result) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Converted amount: ${result}`;
}
