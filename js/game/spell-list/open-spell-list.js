function openAndCloseSpellList() {
  removeHighlightsFromMap();
  removeAllChilds(document.getElementById("player-panel-spell-text"));

  let spellElement = document.getElementById("spell-list-tab");
  if (!spellElement) {
    let player = Game.combatTimeline[Game.turn],
      newElement = document.createElement("div");

    console.log(player.class.cooldowns);

    newElement.id = "spell-list-tab";
    newElement.style.top = player.position.y * 77 + "px";
    newElement.style.left = player.position.x * 77 + 77 + "px";
    document.getElementById("player-area").appendChild(newElement);
    addSpellListKeysToElement(player.class.spells, newElement);
  } else {
    document.getElementById("player-area").removeChild(spellElement);
  }
}

function addSpellListKeysToElement(spellList, element) {
  const player = Game.combatTimeline[Game.turn];
  const { combatstats, cooldowns } = player.class;
  let spellListArray = Object.values(spellList);

  // spellListArray.sort((a, b) => {
  //   return a.id.toUpperCase().localeCompare(b.id.toUpperCase());
  // });

  const newLayerEle = document.createElement("div");
  newLayerEle.id = "spell-list-tab-layer";

  element.appendChild(newLayerEle);

  spellListArray.forEach((spell) => {
    if (!spell.userSpellInfo.learned) return; // Why isn't this returning out of the function and ruins everything???
    const newContainerEle = document.createElement("div");
    const newSpellName = document.createElement("div");
    const newManaImgEle = document.createElement("div");
    const newManaTxtEle = document.createElement("div");
    const cooldownDiv = document.createElement("div");

    newSpellName.innerText = spell.name;
    newSpellName.classList.add("spell-list-spell-name");

    if (cooldowns.includes(spell)) {
      cooldownDiv.innerText =
        cooldowns.find((ele) => ele === spell).userSpellInfo.currentCooldown +
        " CD";
      cooldownDiv.classList.add("spell-list-cooldown-text");
      newContainerEle.appendChild(cooldownDiv);
    } else {
      newManaImgEle.classList.add("spell-list-mana-symbol");
      newManaTxtEle.innerText = spell.spellInfo.manaCost;

      newContainerEle.appendChild(newManaTxtEle);
      newContainerEle.appendChild(newManaImgEle);
    }
    newContainerEle.appendChild(newSpellName);

    newContainerEle.id = "spell-list-" + spell.id;
    newContainerEle.classList.add("spell-list-unit");
    if (
      spell.spellInfo.manaCost > combatstats.currentMana ||
      !spell.userSpellInfo.canBeCast
    ) {
      newContainerEle.classList.add("spell-cant-be-cast");
    } else {
      addOnClickToOpenSpellListElement(spell, newContainerEle);
    }
    // newContainerEle.innerHTML = spell.name

    addOnHoverInfoToSpellList(spell, newContainerEle);

    newLayerEle.appendChild(newContainerEle);
  });
}

const addOnClickToOpenSpellListElement = (spell, element) => {
  element.onclick = (event) => {
    event.preventDefault();
    castSpellPreview(spell);
  };
};

const addOnHoverInfoToSpellList = (spell, element) => {
  element.onmouseover = (event) => {
    event.preventDefault();

    const parentEle = document.getElementById("player-panel-spell-text");
    removeAllChilds(parentEle);

    const newElement = document.createElement("div");
    const newHeaderEle = document.createElement("div");

    newHeaderEle.id = "player-panel-spell-info-header";
    newElement.id = "player-panel-spell-info";
    newHeaderEle.innerText = spell.name;
    newElement.innerText = spellInfoObject[spell.id];

    parentEle.appendChild(newHeaderEle);
    parentEle.appendChild(newElement);
  };
};
