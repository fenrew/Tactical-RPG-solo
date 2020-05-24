const displayDrops = (npc) => {
  const { dropTable } = npc.class;
  const { items } = dropTable;

  const goldValue = Math.floor(
    Math.random() * (dropTable.coins[1] - dropTable.coins[0]) +
      dropTable.coins[0]
  );

  const goldDrop = {
    name: "Gold",
    value: goldValue,
  };

  itemDrops = items
    .map((item) => (Math.random() <= item.dropChance ? item : ""))
    .filter((ele) => ele);

  visualizeDropWindow(npc, goldDrop, itemDrops);
};

const visualizeDropWindow = (npc, gold, items) => {
  const mainContainer = document.createElement("div");

  mainContainer.appendChild(visualizeDropWindow(gold));
  items.forEach((ele) => {
    mainContainer.appendChild(visualizeDropWindow(ele));
  });

  mainContainer.style.top = npc.position.y;
  mainContainer.style.left = npc.position.x;

  document.getElementById("player-area").appendChild(mainContainer);
};

const visualizeDropWindowHelper = (item) => {
  const eachDropContainer = document.createElement("div");
  const dropTitle = document.createElement("div");
  const dropValue = document.createElement("div");
  const dropIcon = document.createElement("div");

  eachDropContainer.classList.add("drop-window-each-drop-container");
  dropTitle.classList.add(
    "drop-window-title",
    "drop-window-title-" + item.name.replace(/\s/g, "-")
  );
  dropValue.classList.add(
    "drop-window-value",
    "drop-window-value-" + item.name.replace(/\s/g, "-")
  );
  dropIcon.classList.add(
    "drop-window-icon",
    "drop-window-icon-" + item.name.replace(/\s/g, "-")
  );

  dropTitle.innerText = item.name;
  dropValue.innerText = item.price;

  eachDropContainer.appendChild(dropTitle);
  eachDropContainer.appendChild(dropValue);
  eachDropContainer.appendChild(dropIcon);
  return eachDropContainer;
};
