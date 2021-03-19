const calculateTotal = (event) => {
    const input = document.querySelector('#amount');
    if(input.value <= 0) {
        alert('Należy podać kwotę większą od zera');
        input.focus();
    } else {
        const select = document.querySelector("#currency");
        const rate = getRate(select.value, input.value);    
    }
    
}

const selectCurrency = () => {
    hideOrNot(true);
}

const setSpans = (rate, amount) => {
    const total = document.querySelector("#total");
    console.log(total);
    total.innerText = (amount/rate).toFixed(2);
    hideOrNot(false);
} 

const hideOrNot = (value) => {
    const to = document.querySelector('#to');
    to.hidden = value;
    const total = document.querySelector('#total');
    total.hidden = value;
    const pln = document.querySelector('#pln');
    pln.hidden = value;
} 

const getRate = (currency, amount) => {
    let rate = 0;
    axios.get('https://api.frankfurter.app/latest?from=PLN')
    .then(data => {
        const currencies = data.data.rates;
        rate = currencies[currency]; 
        setSpans(rate, amount);       
    });
}

const select = document.querySelector('#currency');
select.addEventListener('change',selectCurrency);
const button = document.querySelector('#calculate');
button.addEventListener('click',calculateTotal);