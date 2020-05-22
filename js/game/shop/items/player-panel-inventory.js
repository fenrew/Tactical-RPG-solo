const addPlayerPanelInventory = (player) => {
  const mainContainerEle = document.getElementById("player-panel-inventory");
  removeAllChilds(mainContainerEle);
  const inventoryBackground = document.createElement("div");
  inventoryBackground.id = "player-panel-inventory-background";
  mainContainerEle.appendChild(inventoryBackground);

  addPlayerPanelInventoryHelper(inventoryBackground, player, "weapon");
  addPlayerPanelInventoryHelper(inventoryBackground, player, "chest");
  addPlayerPanelInventoryHelper(inventoryBackground, player, "feet");
  addPlayerPanelInventoryHelper(inventoryBackground, player, "helmet");
  addPlayerPanelInventoryHelper(inventoryBackground, player, "legs");
  addPlayerPanelInventoryHelper(inventoryBackground, player, "shoulders");
};

const addPlayerPanelInventoryHelper = (
  inventoryBackground,
  player,
  itemSlot
) => {
  const { items } = player.class;
  const item = items.find((ele) => ele.type === itemSlot);
  if (!item) return;
  const itemDiv = document.createElement("div");

  itemDiv.classList.add(
    `player-panel-inventory-${itemSlot}`,
    "player-panel-inventory-icon",
    `display-shop-item-icon-${
      item ? item.name.replace(/\s/g, "-").toLowerCase() : ""
    }`
  );

  itemDiv.onclick = () => visualizeItemInventoryMenu(item, player);

  inventoryBackground.appendChild(itemDiv);
};

const visualizeItemInventoryMenu = (item, player) => {
  let containerDiv = document.getElementById("inventory-menu-container");
  if (containerDiv) {
    removeAllChilds(containerDiv);
  } else {
    containerDiv = document.createElement("div");
  }

  const mainSubContainer = document.createElement("div");
  const leftSubContainer = document.createElement("div");
  const rightSubContainer = document.createElement("div");

  const closeButton = document.createElement("div");
  const itemName = document.createElement("div");
  const dropItem = document.createElement("div");

  mainSubContainer.id = "inventory-menu-main-sub-container";
  leftSubContainer.id = "inventory-menu-left-sub-container";
  rightSubContainer.id = "inventory-menu-right-sub-container";

  containerDiv.id = "inventory-menu-container";
  closeButton.classList.add("inventory-menu-close-button");
  itemName.classList.add("inventory-menu-item-name");
  dropItem.classList.add("inventory-menu-drop-item");

  closeButton.innerText = "X";
  itemName.innerText = item.name;
  dropItem.innerText = "Drop Item";

  dropItem.onclick = () => {
    confirmInventoryDropItem(item, player, dropItem);
  };
  closeButton.onclick = () => {
    document.getElementById("player-area").removeChild(containerDiv);
  };

  leftSubContainer.appendChild(dropItem);

  mainSubContainer.appendChild(leftSubContainer);
  mainSubContainer.appendChild(rightSubContainer);

  containerDiv.appendChild(itemName);
  containerDiv.appendChild(closeButton);
  containerDiv.appendChild(mainSubContainer);
  document.getElementById("player-area").appendChild(containerDiv);

  visualizeInventoryItemStats(item);
};

const addOnClickItemInventory = (item) => {};

const confirmInventoryDropItem = (item, player, dropItem) => {
  const containerDiv = document.getElementById("inventory-menu-container");
  let leftContainer = document.getElementById(
    "inventory-menu-left-sub-container"
  );

  const confirmContainer = document.createElement("div");
  const confirmText = document.createElement("div");
  const confirmYes = document.createElement("div");
  const confirmNo = document.createElement("div");

  confirmContainer.classList.add("inventory-menu-drop-item-confirm-container");
  confirmText.classList.add("inventory-menu-drop-item-confirm-text");
  confirmYes.classList.add("inventory-menu-drop-item-confirm-yes");
  confirmNo.classList.add("inventory-menu-drop-item-confirm-no");

  confirmText.innerText = "Confirm?";
  confirmYes.innerText = "Yes";
  confirmNo.innerText = "No";

  confirmContainer.appendChild(confirmText);
  confirmContainer.appendChild(confirmYes);
  confirmContainer.appendChild(confirmNo);

  leftContainer.appendChild(confirmContainer);
  leftContainer.removeChild(dropItem);

  confirmYes.onclick = () => {
    document.getElementById("player-area").removeChild(containerDiv);
    player.class._removeItem(item);
  };

  confirmNo.onclick = () => {
    visualizeItemInventoryMenu(item, player);
  };
};

const visualizeInventoryItemStats = (item) => {
  const rightSubContainer = document.getElementById(
    "inventory-menu-right-sub-container"
  );

  const itemDescription = document.createElement("div");
  const itemStatsHeader = document.createElement("div");
  const itemPrice = document.createElement("div");
  const buyItemButton = document.createElement("div");

  itemDescription.classList.add("inventory-menu-item-description");
  itemStatsHeader.classList.add("inventory-menu-item-stats-header");

  itemDescription.innerText = item.description;
  itemStatsHeader.innerText = "Stats:";

  rightSubContainer.appendChild(itemDescription);
  rightSubContainer.appendChild(itemStatsHeader);

  // ADDING EACH ITEM DETAILS
  item.stats.forEach((stat) => {
    const itemEachStatsContainer = document.createElement("div");
    const itemEachStatName = document.createElement("div");
    const itemEachStatValue = document.createElement("div");

    itemEachStatsContainer.classList.add("inventory-menu-each-stat-container");
    itemEachStatName.classList.add("inventory-menu-item-stats");
    itemEachStatValue.classList.add("inventory-menu-item-stats-value");

    itemEachStatName.innerText = stat.keySequence + ": ";
    itemEachStatValue.innerText = stat.value;

    itemEachStatsContainer.appendChild(itemEachStatName);
    itemEachStatsContainer.appendChild(itemEachStatValue);
    rightSubContainer.appendChild(itemEachStatsContainer);
  });

  rightSubContainer.appendChild(itemPrice);
  rightSubContainer.appendChild(buyItemButton);
};
