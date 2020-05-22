const addOnClickShops = (map = Game.activeMap) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const mapNumber = map[y][x];
      if (
        (mapNumber >= 201 && mapNumber < 207) ||
        (mapNumber >= 301 && mapNumber < 307)
      ) {
        document.getElementById(`map-grid-block-${y},${x}`).onclick = () => {
          openShop(mapNumber);
        };
      }
    }
  }
};

const openShop = (shopNumber) => {
  const shopItems = getShop(shopNumber);

  visualizeShop(shopItems);
};

const closeShop = () => {
  let allItemsDiv = document.getElementById("display-shop-container");
  document.getElementById("player-area").removeChild(allItemsDiv);
};

const visualizeShop = (shopItems) => {
  let allItemsDiv = document.getElementById("display-shop-container");
  if (!allItemsDiv) {
    allItemsDiv = document.createElement("div");
    allItemsDiv.id = "display-shop-container";
  } else {
    removeAllChilds(allItemsDiv);
  }

  const closeButton = document.createElement("div");
  closeButton.innerText = "X";
  closeButton.classList.add("display-shop-close-button");
  closeButton.onclick = () => closeShop();
  allItemsDiv.appendChild(closeButton);

  const itemsListContainer = document.createElement("div");
  itemsListContainer.classList.add("display-shop-items-list-container");
  allItemsDiv.appendChild(itemsListContainer);

  for (let key in shopItems) {
    const itemDiv = document.createElement("div");
    const itemName = document.createElement("div");

    itemDiv.classList.add("display-shop-item-container");
    itemName.classList.add("display-shop-item-name");

    itemName.classList.add(
      "display-shop-item-icon",
      `display-shop-item-icon-${shopItems[key].name
        .replace(/\s/g, "-")
        .toLowerCase()}`,
      `display-shop-item-rareity-${shopItems[key].rareity}`
    );

    itemDiv.appendChild(itemName);

    itemDiv.onclick = () => {
      onClickItemDetails(shopItems[key]);
    };
    itemsListContainer.appendChild(itemDiv);
  }

  document.getElementById("player-area").appendChild(allItemsDiv);
  shopItems ? onClickItemDetails(shopItems[Object.keys(shopItems)[0]]) : "";
};

const onClickItemDetails = (item) => {
  let itemInfoDiv = document.getElementById("display-shop-item-info-container");
  if (!itemInfoDiv) {
    itemInfoDiv = document.createElement("div");
    itemInfoDiv.id = "display-shop-item-info-container";
  } else {
    removeAllChilds(itemInfoDiv);
  }

  const itemName = document.createElement("div");
  const itemDescription = document.createElement("div");
  const itemStatsHeader = document.createElement("div");
  const itemPrice = document.createElement("div");
  const buyItemButton = document.createElement("div");

  itemName.classList.add("display-shop-item-name-details");
  itemDescription.classList.add("display-shop-item-description");
  itemStatsHeader.classList.add("display-shop-item-stats-header");
  itemPrice.classList.add("display-shop-item-price");
  buyItemButton.classList.add("display-shop-item-buy-button");

  itemName.innerText = item.name;
  itemDescription.innerText = item.description;
  itemStatsHeader.innerText = "Stats:";
  itemPrice.innerText = `Price: ${item.price} gold`;
  buyItemButton.innerText = "Buy";

  buyItemButton.onclick = () =>
    Game.combatTimeline[Game.turn].class._buyItem(item);

  itemInfoDiv.appendChild(itemName);
  itemInfoDiv.appendChild(itemDescription);
  itemInfoDiv.appendChild(itemStatsHeader);

  // ADDING EACH ITEM DETAILS
  item.stats.forEach((stat) => {
    const itemEachStatsContainer = document.createElement("div");
    const itemEachStatName = document.createElement("div");
    const itemEachStatValue = document.createElement("div");

    itemEachStatsContainer.classList.add("display-shop-each-item-container");
    itemEachStatName.classList.add("display-shop-item-stats");

    itemEachStatName.innerText = stat.keySequence + ": ";
    itemEachStatValue.innerText = stat.value;

    itemEachStatsContainer.appendChild(itemEachStatName);
    itemEachStatsContainer.appendChild(itemEachStatValue);
    itemInfoDiv.appendChild(itemEachStatsContainer);
  });

  itemInfoDiv.appendChild(itemPrice);
  itemInfoDiv.appendChild(buyItemButton);
  document.getElementById("display-shop-container").appendChild(itemInfoDiv);
};
