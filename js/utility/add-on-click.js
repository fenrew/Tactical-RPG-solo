function addOnClickElements() {}

function addOnClickPlayers() {
  Game.players.forEach((player) => {
    document.getElementById(
      `player-${player.position.y},${player.position.x}`
    ).onclick = function () {
      removeMovementHighlightsFromMap();
      Game._displayMovementHighlights(player);
      addPlayerPanelInfoText(player);
    };
  });
}

const addOnclickToNpcs = () => {
  Game.npc.forEach((npc) => {
    document.getElementById(
      `npc-${npc.position.y},${npc.position.x}`
    ).onclick = () => {
      removeMovementHighlightsFromMap();
      Game._displayMovementHighlights(npc);
      addPlayerPanelInfoText(npc);
    };
  });
};

const addOnClickToOneNpc = (npcEle, npc) => {
  npcEle.onclick = function () {
    removeMovementHighlightsFromMap();
    Game._displayMovementHighlights(npc);
    addPlayerPanelInfoText(npc);
  };
};

function addOnClickMovementHighlight(highlightDiv, position) {
  highlightDiv.onclick = function () {
    removeMovementHighlightsFromMap();
    let movementRoute = findBestMovementRoute(
      position,
      Game.availableMovementMap
    );
    movementVisuals(movementRoute, Game.combatTimeline[Game.turn].position);
    confirmMovementToPosition(position);
  };
}

const addPlayerPanelInfoText = (player) => {
  const boxEle = document.getElementById("player-panel-char-info-box");
  removeAllChilds(boxEle);
  const newHeaderEle = document.createElement("div");
  const newTextEle = document.createElement("div");
  const newListEle = document.createElement("div");

  newListEle.classList.add("panel-char-info-text");
  newHeaderEle.id = "panel-char-info-header";
  newHeaderEle.classList.add(
    `player${player.playerNumber}-panel-char-info-header`
  );
  newTextEle.id = "panel-char-info-text-box";

  newHeaderEle.innerText = `Player: ${player.playerNumber + 1} (${
    player.class.className
  })`;

  const {
    hp,
    currentHp,
    mana,
    currentMana,
    currentMovementPoints,
    maxMovementPoints,
  } = player.class.combatstats;

  const newHpEle = newListEle.cloneNode(true);
  const newManaEle = newListEle.cloneNode(true);
  const newMpEle = newListEle.cloneNode(true);

  newHpEle.innerText = `${currentHp}/${hp} hp`;
  newManaEle.innerText = `${currentMana}/${mana} mana`;
  newMpEle.innerText = `${currentMovementPoints}/${maxMovementPoints} mp`;

  newHpEle.style.color = `rgb(0, ${(currentHp * 135) / hp + 120}, 0)`;
  newManaEle.style.color = `rgb(0, 0, ${(currentMana * 135) / mana + 120})`;
  newMpEle.style.color = `rgb(${
    (currentMovementPoints * 135) / maxMovementPoints + 120
  }, 0, 0)`;

  boxEle.appendChild(newHeaderEle);
  boxEle.appendChild(newTextEle);
  newTextEle.appendChild(newHpEle);
  newTextEle.appendChild(newManaEle);
  newTextEle.appendChild(newMpEle);
};
