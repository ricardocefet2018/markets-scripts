let startDate = "2024-01-01";
let endDate = "2024-02-01";

let start = Math.round(
  new Date(`${startDate}T00:00:00-03:00`).getTime() / 1000
);
let end = Math.round(new Date(`${endDate}T00:00:00-03:00`).getTime() / 1000);

const timeout = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

class SoldItem {
  constructor(name, cny, date) {
    this.name = name;
    this.cny = cny;
    this.date = date;
  }
}

async function getSoldItemsBuff(start, end, page = 1, soldItems = []) {
  try {
    let res = await fetch(
      `https://buff.163.com/market/sell_order/history?game=csgo&start_time=${start}&end_time=${end}&state=success&page_num=${page}`,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        },
        method: "GET",
        // @ts-ignore
        credentials: "include",
      }
    );
    let text = await res.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    let items = [...doc.querySelectorAll(".list_tb_csgo>tr")];
    console.log(items.length);
    items.forEach((item) => {
      try {
        let property = [...item.querySelectorAll("td")];
        let name = property[2].querySelector("span").innerText;
        let cny =
          Number(property[3].querySelector("strong").innerText.slice(2)) *
          0.975;
        cny = Number(cny.toFixed(2));
        let dateNum =
          Number(property[5].querySelector("span").getAttribute("data-ts")) *
          1000;
        let date = new Date(dateNum);
        let soldItem = new SoldItem(name, cny, date);
        soldItems.push(soldItem);
      } catch (err) {
        return soldItems;
      }
    });

    if (items.length == 10) {
      await timeout(2000);
      return await getSoldItemsBuff(start, end, page + 1, soldItems);
    }
    return soldItems;
  } catch (err) {
    throw err;
  }
}

getSoldItemsBuff(start, end).then((soldItems) => {
  console.log(JSON.stringify(soldItems, undefined, 2));
});
