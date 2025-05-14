// DMARKET TOTAL VALUE
const total = Array.from(document.querySelectorAll('price')).reduce((acc, p)=>{
    const price = Number(p.innerText.replace("$", ""))
    return acc + price
}, 0);
console.log("Total items on sale value + balance:", total)