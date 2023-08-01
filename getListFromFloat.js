const steamID = "xxxxxxxxxxxxxxxxx"; // SEU STEAM ID ENTRA AQUI NO LUGAR DOS "x";

fetch("https://csgofloat.com/api/v1/me/trades?page=0&limit=100", {
  headers: {
    accept: "application/json, text/plain, */*",
  },
  method: "GET",
  credentials: "include",
})
  .then((res) => res.json())
  .then((json) => {
    let compras = json.trades.filter((trade)=>trade.buyer_id == steamID);
    const itemsToSave = compras.map((compra)=>{
      return ({
        name: compra.contract.item.market_hash_name,
        usdPrice: compra.contract.price/100,
        boughtAt: "float",
        purchaseDate: compra.verified_at
      })
    })
      let string = JSON.stringify(itemsToSave);
      console.log(","+string.slice(1,-1));
  });