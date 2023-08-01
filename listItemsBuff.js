let itemsComprados = [].reverse(); // sua lista de items vai aqui entre os []
let referenceRate = 0.1398934; // 1 CNY em USD
let listItemsNotToBuff = true; // lista items que estão valendo a pena mas não foram comprados para o buff

let totalUSD = 0;
let totalCNY = 0;
itemsComprados = itemsComprados.filter((item) => {
  if (
    new Date().getTime() - new Date(item.purchaseDate).getTime() >
    7 * 24 * 1000 * 60 * 60
  ) {
    return item;
  }
});

let itemsCompradosStringArray = itemsComprados.map((item) => {
  return item.name;
});
let cards = [...document.querySelectorAll(".salable")];
cards.forEach((card) => {
  let itemPriceOnBuff = Number(card.querySelector("p").innerText.slice(2));
  if (itemsCompradosStringArray.includes(card.querySelector("h3").innerText)) {
    let index = itemsCompradosStringArray.indexOf(
      card.querySelector("h3").innerText
    );
    if (itemsComprados[index].boughtTo) {
      if (itemsComprados[index].boughtTo == "buff") {
        totalUSD += itemsComprados[index].usdPrice;
        totalCNY += itemPriceOnBuff * 0.975;
        console.log(itemsComprados[index].name);
        console.log("$" + itemsComprados[index].usdPrice);
        console.log("¥" + itemPriceOnBuff + ` (¥${itemPriceOnBuff * 0.975})`);
        console.log(
          "rate: ",
          itemsComprados[index].usdPrice / (itemPriceOnBuff * 0.975)
        );
        console.log("////////////////////////////////");
        card.click();
      } else if (
        itemsComprados[index].usdPrice / referenceRate <
          itemPriceOnBuff * 0.975 &&
        listItemsNotToBuff
      ) {
        console.log("Not to buff!");
        totalUSD += itemsComprados[index].usdPrice;
        totalCNY += itemPriceOnBuff * 0.975;
        console.log(itemsComprados[index].name);
        console.log("$" + itemsComprados[index].usdPrice);
        console.log("¥" + itemPriceOnBuff + ` (¥${itemPriceOnBuff * 0.975})`);
        console.log(
          "rate: ",
          itemsComprados[index].usdPrice / (itemPriceOnBuff * 0.975)
        );
        console.log("////////////////////////////////");
        card.click();
      }
    } else if (itemsComprados[index].boughtAt != "buff") {
      totalUSD += itemsComprados[index].usdPrice;
      totalCNY += itemPriceOnBuff * 0.975;
      console.log(itemsComprados[index].name);
      console.log("$" + itemsComprados[index].usdPrice);
      console.log("¥" + itemPriceOnBuff + ` (¥${itemPriceOnBuff * 0.975})`);
      console.log(
        "rate: ",
        itemsComprados[index].usdPrice / (itemPriceOnBuff * 0.975)
      );
      console.log("////////////////////////////////");
      card.click();
    }
  }
});

console.log("USD/CNY rate = ", totalUSD / totalCNY);
console.log("reference rate = ", referenceRate);
console.log("rate btw rates = ", totalUSD / totalCNY / referenceRate);
