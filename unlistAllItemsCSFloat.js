// Unlist all items CSFloat
unlistAllItems().then(() => {
  console.log("Done!");
});

async function unlistAllItems() {
  const inv = await getAllListings();
  for (const item of inv) {
    const success = await unlistItem(item.id);
    if (!success)
      console.log(`Erro ao delistar o item ${item.item.market_hash_name}`);
  }
}

async function unlistItem(itemId) {
  const res = await fetch(`https://csfloat.com/api/v1/listings/${itemId}`, {
    headers: {
      accept: "application/json",
    },
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  });
  return res.status == 200;
}

async function getAllListings() {
  const sid = await getSteamID();
  let cursor = undefined;
  let dataSize;
  const inv = [];
  do {
    const listing = await getListings(sid, cursor);
    dataSize = listing.data.length;
    cursor = listing.cursor;
    inv.push(...listing.data);
  } while (dataSize == 40);

  return inv;
}

async function getListings(sid, cursor) {
  let url = `https://csfloat.com/api/v1/users/${sid}/stall?limit=40`;
  if (cursor !== undefined) url += `&cursor=${cursor}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  const json = await res.json();
  return json;
}

async function getSteamID() {
  const res = await fetch("https://csfloat.com/api/v1/me", {
    headers: {
      accept: "application/json",
    },
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const json = await res.json();
  return json?.user?.steam_id;
}
