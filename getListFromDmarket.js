let rate = 0.1393184; // 1 CNY em USD
let multiplier = 1 * 1.05 * 1.017; // Multiplicação das suas taxas para receber o valor real (1.05 é a taxa de saque do shadowpay)

let items = [...document.querySelectorAll("app-history-item")];

let purchases = items.map((item) => {
  let unformattedDH = item.querySelectorAll("div")[0].innerText;
  let [unfDate, unfH] = unformattedDH.split(", ");
  let date =
    unfDate
      .split("/")
      .reverse()
      .reduce((a, b) => a + "-" + b) +
    "T" +
    unfH +
    ":00.000Z";

  let name = item.querySelectorAll("div")[3].innerText;
  let price = Number(
    (Number(item.querySelectorAll("div")[4].innerText) * multiplier).toFixed(2)
  );
  return {
    name: name,
    usdPrice: price,
    boughtAt: "buff",
    yuanPrice: price / rate,
    purchaseDate: date,
  };
});

let purchasesString = JSON.stringify(purchases);
purchasesString = "," + purchasesString.slice(1, purchasesString.length - 1);

console.log(purchasesString);
