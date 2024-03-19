// WAXPEER
let divs = [...document.querySelectorAll("#app > div > div > div.modal__wrap > div > div.modal-body > ul > div")]

for (const div of divs) {
  let inputPreco = div.querySelector('input');
  inputPreco.value = (Number(inputPreco.value)*3).toString();
  inputPreco.dispatchEvent(new Event('change'));
}