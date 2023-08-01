let limit = 100; // Numero máximo de trades que quer listar

fetch(
  `https://csfloat.com/api/v1/me/trades?role=buyer&state=verified&limit=${limit}&page=1`,
  {
    headers: {
      accept: "application/json, text/plain, */*",
    },
    method: "GET",
    credentials: "include",
  }
)
  .then((res) => res.json())
  .then((json) => {
    const itemsToSave = json.trades.map((compra) => {
      return {
        name: compra.contract.item.market_hash_name,
        usdPrice: compra.contract.price / 100,
        boughtAt: "float",
        purchaseDate: compra.verified_at,
      };
    });
    let string = JSON.stringify(itemsToSave);
    console.log("," + string.slice(1, -1));
  })
  .catch((err) => console.log(err));
