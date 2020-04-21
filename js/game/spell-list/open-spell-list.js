function openAndCloseSpellList() {
  removeHighlightsFromMap();
  removeAllChilds(document.getElementById("player-panel-spell-text"));

  let spellElement = document.getElementById("spell-list-tab");
  if (!spellElement) {
    let player = Game.combatTimeline[Game.turn],
      newElement = document.createElement("div");

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
  const { currentMana } = Game.combatTimeline[Game.turn].class.combatstats;
  let spellListArray = Object.values(spellList);

  // spellListArray.sort((a, b) => {
  //   return a.id.toUpperCase().localeCompare(b.id.toUpperCase());
  // });

  const newLayerEle = document.createElement("div");
  newLayerEle.id = "spell-list-tab-layer";

  element.appendChild(newLayerEle);

  spellListArray.forEach((spell) => {
    if (!spell.spellInfo.learned) return;
    const newContainerEle = document.createElement("div");
    const newSpellName = document.createElement("div");
    const newManaImgEle = document.createElement("div");
    const newManaTxtEle = document.createElement("div");

    newSpellName.innerText = spell.name;
    newSpellName.classList.add("spell-list-spell-name");

    newManaImgEle.classList.add("spell-list-mana-symbol");

    newManaTxtEle.innerText = spell.spellInfo.manaCost;

    newContainerEle.appendChild(newManaTxtEle);
    newContainerEle.appendChild(newManaImgEle);
    newContainerEle.appendChild(newSpellName);

    newContainerEle.id = "spell-list-" + spell.id;
    newContainerEle.classList.add("spell-list-unit");
    if (spell.spellInfo.manaCost > currentMana || !spell.spellInfo.canBeCast)
      newContainerEle.classList.add("insufficient-mana");
    // newContainerEle.innerHTML = spell.name

    addOnClickToOpenSpellListElement(spell, newContainerEle);
    addOnHoverToSpellList(spell, newContainerEle);

    newLayerEle.appendChild(newContainerEle);
  });
}

const addOnClickToOpenSpellListElement = (spell, element) => {
  element.onclick = (event) => {
    event.preventDefault();
    castSpellPreview(spell);
  };
};

const addOnHoverToSpellList = (spell, element) => {
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
