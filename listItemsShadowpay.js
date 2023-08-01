let inputs = [...document.querySelectorAll("div.price-input")].map((d)=>d.querySelector('input'))

inputs.forEach((input)=>{
    input.value = Number(input.value)*4
    input.dispatchEvent(new Event('input'));
})