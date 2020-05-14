document.addEventListener("keydown", function (event) {
  if (event.which === 83) {
    console.log("S");
    if (!Game.npcActiveTurn) {
      removeMovementHighlightsFromMap();
      openAndCloseSpellList();
    }
  }
  if (event.which === 84) {
    console.log("T");
    if (!Game.npcActiveTurn) {
      removeMovementHighlightsFromMap();
    }
  }
  if (event.which === 27) {
    console.log("ESC");
    if (!Game.npcActiveTurn) {
      Game._nextTurn();
    }
  }
});
