let listings = [...document.querySelectorAll("body > app-root > div > div:nth-child(2) > app-sell-home > mat-drawer-container > mat-drawer > div > app-sell-queue > div > div.items > div > app-sell-queue-item")]

listings.forEach((l)=>{
  let input = l.querySelector('input');
  let value = Number(input.value)*4;
  input.value = Math.round(value * 100)/100;
  input.dispatchEvent(new Event('input'));
})