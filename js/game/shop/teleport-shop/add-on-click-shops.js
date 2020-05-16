const addOnClickShops = (map = Game.activeMap) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const mapNumber = map[y][x];

      if (
        (mapNumber >= 201 && mapNumber < 207) ||
        (mapNumber >= 301 && mapNumber < 307)
      ) {
        mapGridEle.onclick = () => {
          openShop(mapNumber);
        };
      }
    }
  }
};

const openShop = (shopNumber) => {
  console.log("Shop clicked " + shopNumber);

  const shopItems = getShop(shopNumber);

  visualizeShop(shopItems);
};

const visualizeShop = (shopItems) => {
  console.log("Visualize shop");

  const allItemsDiv = document.createElement("div");
  allItemsDiv.id = "display-shop-container";

  for (let key in shopItems) {
    const itemDiv = document.createElement("div");
    const itemName = document.createElement("div");

    itemDiv.classList.add("display-shop-item-container");
    itemName.classList.add(
      "display-shop-item-name",
      `display-shop-item-rareity-${shopItems[key].rareity}`
    );

    itemName.innerText = shopItems[key].name;

    itemDiv.onclick = () => {
      addOnClickItem(shopItems[key]);
    };

    itemDiv.appendChild(itemName);
    allItemsDiv.appendChild(itemDiv);
  }

  document.getElementById("player-area").appendChild(allItemsDiv);
};

const addOnClickItem = (item) => {
  let itemInfoDiv = document.getElementById("display-shop-item-info-container");
  if (!itemInfoDiv) {
    itemInfoDiv = document.createElement("div");
    itemInfoDiv.id = "display-shop-item-info-container";
  }

  const itemDescription = document.createElement("div");
  const itemStatsHeader = document.createElement("div");
  const itemEachStatsContainer = document.createElement("div");
  const itemEachStats = document.createElement("div");
  const buyItemButton = document.createElement("div");

  itemDescription.classList.add("display-shop-item-description");
  itemStatsHeader.classList.add("display-shop-item-header");
  itemEachStatsContainer.classList.add("display-shop-each-item-container");
  itemEachStats.classList.add("display-shop-item-stats");
  buyItemButton.classList.add("display-shop-item-buy-button");
};
