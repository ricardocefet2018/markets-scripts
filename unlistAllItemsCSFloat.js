fetch("https://csfloat.com/api/v1/me/listings", {
  headers: {
    accept: "application/json, text/plain, */*",
  },
  method: "GET",
  mode: "cors",
  credentials: "include",
})
  .then((res) => res.json())
  .then((json) => {
    for (let listing of json) {
      fetch(`https://csfloat.com/api/v1/listings/${listing.id}`, {
        headers: {
          accept: "application/json, text/plain, */*",
        },
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(
              `${listing.item.market_hash_name} deslistado com sucesso!`
            );
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(
            `Erro ou delistar o item ${listing.item.market_hash_name}`
          );
        });
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Houve um erro inesperado!");
  });
