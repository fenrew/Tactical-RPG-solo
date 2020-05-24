const displayDrops = (npc) => {
  console.log("DISPLAY DROPS");
  const { dropTable } = npc.class;
  const { items } = dropTable;

  const goldValue = Math.floor(
    Math.random() * (dropTable.coins[1] - dropTable.coins[0]) +
      dropTable.coins[0]
  );

  const goldDrop = {
    name: "Gold",
    gold: goldValue,
  };

  itemDrops = items
    .map((item) => (Math.random() <= item.dropChance ? item : ""))
    .filter((ele) => ele);

  visualizeDropWindow(npc, goldDrop, itemDrops);
};

const visualizeDropWindow = (npc, gold, items) => {
  const mainContainer = document.createElement("div");

  mainContainer.appendChild(visualizeDropWindowHelper(gold));
  items.forEach((ele) => {
    mainContainer.appendChild(visualizeDropWindowHelper(ele));
  });

  mainContainer.id = "drop-window-main-container";
  mainContainer.style.top = npc.position.y * 77 + "px";
  mainContainer.style.left = npc.position.x * 77 + "px";

  document.getElementById("player-area").appendChild(mainContainer);
};

const visualizeDropWindowHelper = (item) => {
  const eachDropContainer = document.createElement("div");
  const dropTitle = document.createElement("div");
  const dropValue = document.createElement("div");
  const dropIcon = document.createElement("div");
  const grabButton = document.createElement("div");
  const shareButton = document.createElement("div");
  const dropButton = document.createElement("div");

  eachDropContainer.classList.add("drop-window-each-drop-container");
  dropTitle.classList.add("drop-window-title");
  dropValue.classList.add("drop-window-value");
  dropIcon.classList.add(
    "drop-window-icon",
    "display-shop-item-icon-" + item.name.replace(/\s/g, "-").toLowerCase()
  );
  grabButton.classList.add("drop-window-grab-button");
  shareButton.classList.add("drop-window-share-button");
  dropButton.classList.add("drop-window-drop-button");

  dropTitle.innerText = item.name;
  dropValue.innerText = item.gold ? item.gold : "";
  grabButton.innerText = "Grab";
  shareButton.innerText = "Share";
  dropButton.innerText = "Drop";

  dropIcon.appendChild(dropValue);
  eachDropContainer.appendChild(dropIcon);
  eachDropContainer.appendChild(dropTitle);
  eachDropContainer.appendChild(grabButton);
  eachDropContainer.appendChild(shareButton);
  eachDropContainer.appendChild(dropButton);

  grabButton.onclick = () => {
    const player = Game.combatTimeline[Game.turn];
    onClickGrabDrop(player, item, eachDropContainer);
  };

  shareButton.onclick = () => {
    visualizeShareDrop(item, eachDropContainer);
  };

  dropButton.onclick = () => {
    const playerArea = document.getElementById("player-area");
    const dropWindowContainer = document.getElementById(
      "drop-window-main-container"
    );
    dropWindowContainer.removeChild(eachDropContainer);

    if (playerArea.childNodes.length)
      playerArea.removeChild(dropWindowContainer);
  };

  return eachDropContainer;
};

const onClickGrabDrop = (player, drop, dropDiv) => {
  const response = drop.gold
    ? (player.gold += drop.gold)
    : player.class._addNewItem(drop);
  console.log("RESPONSE", response);

  if (response) {
    const dropWindowContainer = document.getElementById(
      "drop-window-main-container"
    );
    dropWindowContainer.removeChild(dropDiv);

    if (dropWindowContainer.childNodes.length <= 0)
      document.getElementById("player-area").removeChild(dropWindowContainer);
  }
};

const visualizeShareDrop = (drop, dropDiv) => {
  const mainContainer = document.createElement("div");
  mainContainer.id = "drop-window-share-drop-main-container";
  document
    .getElementById("drop-window-main-container")
    .appendChild(mainContainer);
  console.log(Game.players);

  Game.players.forEach((player) => {
    const playerNumberDiv = document.createElement("div");

    playerNumberDiv.classList.add("drop-window-share-drop-player-number");
    playerNumberDiv.innerText = `Player: ${player.playerNumber + 1}`;

    mainContainer.appendChild(playerNumberDiv);

    playerNumberDiv.onclick = () => {
      onClickGrabDrop(player, drop, dropDiv);
      document
        .getElementById("drop-window-main-container")
        .removeChild(mainContainer);
    };
  });
};
