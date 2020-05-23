const displayDrops = (npc) => {
  const { dropTable } = npc.class;
  const { items } = dropTable;

  const goldDrop = Math.floor(
    Math.random() * (dropTable.coins[1] - dropTable.coins[0]) +
      dropTable.coins[0]
  );
  console.log(goldDrop);

  itemDrops = items
    .map((item) => (Math.random() <= item.dropChance ? item : ""))
    .filter((ele) => ele);
};

const visualizeDropWindow = (gold, items) => {
  const mainContainer = document.createElement("div");
  const eachDropContainer = document.createElement("div");
  const goldTitle = document.createElement("div");
  const goldValue = document.createElement("div");
  const goldIcon = document.createElement("div");

  goldTitle.classList.add("goldTitle");
  goldValue.classList.add("goldValue");

  eachDropContainer.appendChild(goldTitle);
};

const visualizeDropWindowHelper = (className, mainContainer) => {
  const eachDropContainer = document.createElement("div");
  const dropTitle = document.createElement("div");
  const dropValue = document.createElement("div");
  const dropIcon = document.createElement("div");

  dropTitle.classList.add("goldTitle");
  dropValue.classList.add("goldValue");
  dropIcon.classList.add("goldValue");

  eachDropContainer.appendChild(dropTitle);
  eachDropContainer.appendChild(dropValue);
  eachDropContainer.appendChild(dropIcon);
};
