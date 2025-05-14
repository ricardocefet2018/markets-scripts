// SHADOWPAY
let inputs = [...document.querySelectorAll("div.cart-list__item-wrap")].map((d)=>d.querySelector('input'))

inputs.forEach((input)=>{
    input.value = Number(input.value)*4
    input.dispatchEvent(new Event('input'));
})
