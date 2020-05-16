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
      addOnClickItemDetails(shopItems[key]);
    };

    itemDiv.appendChild(itemName);
    allItemsDiv.appendChild(itemDiv);
  }

  document.getElementById("player-area").appendChild(allItemsDiv);
};

const addOnClickItemDetails = (item) => {
  let itemInfoDiv = document.getElementById("display-shop-item-info-container");
  if (!itemInfoDiv) {
    itemInfoDiv = document.createElement("div");
    itemInfoDiv.id = "display-shop-item-info-container";
  }

  const itemName = document.createElement("div");
  const itemDescription = document.createElement("div");
  const itemStatsHeader = document.createElement("div");
  const itemPrice = document.createElement("div");
  const buyItemButton = document.createElement("div");

  itemName.classList.add("display-shop-item-name-details");
  itemDescription.classList.add("display-shop-item-description");
  itemStatsHeader.classList.add("display-shop-item-header");
  itemPrice.classList.add("display-shop-item-price");
  buyItemButton.classList.add("display-shop-item-buy-button");

  itemName.innerText = item.name;
  itemDescription.innerText = item.description;
  itemStatsHeader.innerText = "Stats:";
  itemPrice.innerText = "Price: " + item.price + "gold";
  buyItemButton.innerText = "Buy";

  itemInfoDiv.appendChild(itemName);
  itemInfoDiv.appendChild(itemDescription);
  itemInfoDiv.appendChild(itemStatsHeader);

  item.stats.forEach((stat) => {
    const itemEachStatsContainer = document.createElement("div");
    const itemEachStatName = document.createElement("div");
    const itemEachStatValue = document.createElement("div");

    itemEachStatsContainer.classList.add("display-shop-each-item-container");
    itemEachStatName.classList.add("display-shop-item-stats");

    itemEachStatName.innerText = stat.keySequence;
    itemEachStatValue.innerText = stat.value;

    itemEachStatsContainer.appendChild(itemEachStatName);
    itemEachStatsContainer.appendChild(itemEachStatValue);
    itemInfoDiv.appendChild(itemEachStatsContainer);
  });

  itemInfoDiv.appendChild(itemPrice);
  itemInfoDiv.appendChild(buyItemButton);
};
