const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button"),
  exIcon = document.querySelector(".icon"),
  getRate = document.querySelector(".exchange-rate");
amount = document.querySelector(".amount input");

key = "bba8fd5166c076a91e7e4ac11f82ed38";

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "SOS" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

exIcon.addEventListener("click", () => {
  let temCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/48.png`;
    }
  }
}

window.addEventListener("load", (e) => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

function getExchangeRate() {
  let amountValue = amount.value;
  if (amountValue == "" || amountValue == 0) {
    amount.value = "1";
    amountValue = amount.value;
  }
  getRate.innerHTML = "Getting exchange rate...";
  getRate.classList.remove("alert");
  let url = `http://api.exchangeratesapi.io/v1/latest?access_key=${key}&symbols =${fromCurrency.values}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.rates[toCurrency.value];
      let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
      getRate.innerHTML = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      getRate.innerHTML = "something went wrong...";
      getRate.classList.add("alert");
    });
}
