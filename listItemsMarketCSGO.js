// MarketCSGO
// Não liste mais do que 15 items por vez!
const listings = document.querySelectorAll("app-sell-item-form");

listings.forEach((l) => {
  let input = l.querySelector("input");
  let value = Number(input.value) * 4;
  input.value = Math.round(value * 100) / 100;
  input.dispatchEvent(new Event("input"));
});
