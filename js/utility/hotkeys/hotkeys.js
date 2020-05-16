document.addEventListener("keydown", function (event) {
  let activePlayer = Game.combatTimeline[Game.turn];
  if (activePlayer.npc) return;
  removeMovementHighlightsFromMap();

  if (event.which === 83) {
    console.log("S");
    openAndCloseSpellList();
  }

  if (event.which === 84) {
    const { y, x } = activePlayer.position;
    const mapNumber = Game.originalMap[y][x];
    console.log("T");

    if (mapNumber >= 27 && mapNumber < 30) {
      if (!activePlayer.shop) {
        teleportToShop(activePlayer, mapNumber);
      } else {
        teleportFromShop(activePlayer);
      }
    }
  }
  if (event.which === 27) {
    console.log("ESC");
    if (activePlayer.shop) return console.log("Can't end turn while in a shop");
    Game._nextTurn();
  }
});
