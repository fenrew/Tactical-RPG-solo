const addPlayerPanelInventory = (player) => {
  const mainContainerEle = document.getElementById("player-panel-inventory");
  removeAllChilds(mainContainerEle);
  const inventoryBackground = document.createElement("div");
  inventoryBackground.id = "player-panel-inventory-background";
  mainContainerEle.appendChild(inventoryBackground);

  const { items } = player.class;

  addPlayerPanelInventoryHelper(inventoryBackground, items, "weapon");
  addPlayerPanelInventoryHelper(inventoryBackground, items, "chest");
  addPlayerPanelInventoryHelper(inventoryBackground, items, "feet");
  addPlayerPanelInventoryHelper(inventoryBackground, items, "helmet");
  addPlayerPanelInventoryHelper(inventoryBackground, items, "legs");
  addPlayerPanelInventoryHelper(inventoryBackground, items, "shoulders");
};

const addPlayerPanelInventoryHelper = (
  inventoryBackground,
  items,
  itemSlot
) => {
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

  itemDiv.onclick = () => visualizeItemInventoryMenu(item);

  inventoryBackground.appendChild(itemDiv);
};

const visualizeItemInventoryMenu = (item) => {
  console.log("CLIICK");
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
  dropItem.innerText = "Drop";

  closeButton.onclick = () => {
    document.getElementById("player-area").removeChild(containerDiv);
  };

  containerDiv.appendChild(closeButton);
  containerDiv.appendChild(itemName);
  containerDiv.appendChild(dropItem);
  document.getElementById("player-area").appendChild(containerDiv);
};

const addOnClickItemInventory = (item) => {};
