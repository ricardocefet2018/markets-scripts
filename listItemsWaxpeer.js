let divs = [...document.querySelectorAll("#app > div > div > div.modal__wrap > div > div.modal-body > ul > div")]

for (const div of divs) {
  let inputPreco = div.querySelector('input');
  let precoSteam = Number(div.querySelector('div.f.item_bottom > div.f.prices > div > p > span').innerText);
  inputPreco.value = (precoSteam*5).toString();
  inputPreco.dispatchEvent(new Event('input'));
}