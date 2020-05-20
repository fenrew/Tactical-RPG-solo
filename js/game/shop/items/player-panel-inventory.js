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
  const closeButton = document.createElement("div");
  const itemName = document.createElement("div");
  const dropItem = document.createElement("div");

  containerDiv.id = "inventory-menu-container";
  closeButton.classList.add("inventory-menu-clost-button");
  itemName.classList.add("inventory-menu-item-name");
  dropItem.classList.add("inventory-menu-drop-item");

  closeButton.innerText = "X";
  itemName.innerText = item.name;
  dropItem.innerText = "Drop Item";

  dropItem.onclick = () => {
    confirmInventoryDropItem(item, player);
  };
  closeButton.onclick = () => {
    document.getElementById("player-area").removeChild(containerDiv);
  };

  containerDiv.appendChild(closeButton);
  containerDiv.appendChild(itemName);
  containerDiv.appendChild(dropItem);
  document.getElementById("player-area").appendChild(containerDiv);
};

const addOnClickItemInventory = (item) => {};

const confirmInventoryDropItem = (item, player) => {
  let containerDiv = document.getElementById("inventory-menu-container");

  const confirmContainer = document.createElement("div");
  const confirmText = document.createElement("div");
  const confirmYes = document.createElement("div");
  const confirmNo = document.createElement("div");

  confirmText.innerText = "Confirm?";
  confirmYes.innerText = "Yes";
  confirmNo.innerText = "No";

  confirmContainer.appendChild(confirmText);
  confirmContainer.appendChild(confirmYes);
  confirmContainer.appendChild(confirmNo);

  containerDiv.appendChild(confirmContainer);

  confirmYes.onclick = () => {
    document.getElementById("player-area").removeChild(containerDiv);
    player.class._removeItem(item);
  };

  confirmNo.onclick = () => {
    visualizeItemInventoryMenu(item, player);
  };
};
