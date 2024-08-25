// WAXPEER
let inputs = [...document.querySelectorAll("ul.list.sell_items__list input")];

for (let i = 0; i < inputs.length; i += 2) {
  inputPreco = inputs[i];
  inputPreco.value = (Number(inputPreco.value) * 3).toFixed(2);
  inputPreco.dispatchEvent(new Event("input"));
}
