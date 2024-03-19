// CSFLOAT
let listings = [...document.querySelectorAll("body > app-root > div > div.content > app-sell-home > div > mat-drawer-container > mat-drawer > div > app-sell-queue > div > div.items > div > app-sell-queue-item > div > div.name-price-container")]

listings.forEach((l)=>{
  let input = l.querySelector('input');
  let value = Number(input.value)*4;
  input.value = Math.round(value * 100)/100;
  input.dispatchEvent(new Event('input'));
})