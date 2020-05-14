document.addEventListener("keydown", function (event) {
  let activePlayer = Game.combatTimeline[Game.turn];
  if (activePlayer.npc) return;

  if (event.which === 83) {
    console.log("S");
    removeMovementHighlightsFromMap();
    openAndCloseSpellList();
  }
  if (event.which === 84) {
    const { y, x } = activePlayer.position;
    const mapNumber = Game.originalMap[y][x];
    console.log("T", activePlayer);
    removeMovementHighlightsFromMap();
    if (mapNumber >= 27 && mapNumber < 30) {
      teleportToShop(activePlayer, mapNumber);
    }
  }
  if (event.which === 27) {
    console.log("ESC");
    Game._nextTurn();
  }
});
