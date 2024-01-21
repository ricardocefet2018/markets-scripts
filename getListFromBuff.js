let pageFinal = 1; // onde deseja parar de gerar a lista
let usdCnyRate = 0.1393184; // 1 CNY em USD
let offset = 0; // números de página que deseja PULAR
let blackList = ["sticker", "capsule"]; // O que não quer que entre na sua lista (mas que comprou)

function getItemComprados(itemPrices = [], page = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(
        `https://buff.163.com/market/buy_order/history?game=csgo&state=success&page_num=${page+offset}`,
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          },
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.text())
        .then((text) => {
          let parser = new DOMParser();
          let doc = parser.parseFromString(text, "text/html");
          let items = Array.prototype.slice.call(
            doc.querySelectorAll(".textOne")
          );

          items = items.map((text) => {
            return text.innerText;
          });

          let prices = Array.prototype.slice.call(
            doc.querySelectorAll(".f_Strong")
          );
          prices.shift();

          let pricesYuan = prices.map((p) => {
            return Math.round(Number(p.innerText.split("¥ ")[1]));
          });

          prices = prices.map((p) => {
            return (
              Math.round(
                Number(p.innerText.split("¥ ")[1]) * 100 * usdCnyRate
              ) / 100
            );
          });

          let dates = [...doc.querySelectorAll(".moment-ts")].map(
            (dateHTML) => {
              return new Date(Number(dateHTML.attributes['data-ts'].value)*1000).toISOString();
            }
          );

          for (let i = 0; i < 10; i++) {
            itemPrices.push({
              name: items[i],
              usdPrice: prices[i],
              boughtAt: "buff",
              yuanPrice: pricesYuan[i],
              purchaseDate: dates[i],
            });
          }
          if (page+offset < pageFinal) {
            resolve(getItemComprados(itemPrices, page + 1));
          } else {
            resolve(itemPrices);
          }
        });
    }, 5000);
  });
}

getItemComprados().then((itemPrices) => {
  let itemsFiltered = itemPrices.filter(
    (item) => !includesBlackListedWords(item)
  ).reverse();
  console.log("," + JSON.stringify(itemsFiltered, undefined, 2).slice(1, -1));
});

function includesBlackListedWords(item) {
  let includes = false;
  for (let i = 0; i < blackList.length; i++) {
    if (item.name.toLowerCase().includes(blackList[i].toLowerCase())) {
      includes = true;
    }
  }
  return includes;
}