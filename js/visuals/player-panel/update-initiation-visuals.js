function updatePlayerPanelCombatTimelineVisuals() {
  let combatTimeline = Game.combatTimeline;
  let combatTimelineDiv = document.getElementById("combat-timeline-icons-box");
  removeAllChilds(combatTimelineDiv);

  combatTimeline.forEach((ele) => {
    let iconDiv;

    iconDiv = document.createElement("div");
    iconDiv.classList.add(
      ele.class.cssPlayerPanelString,
      "combat-timeline-icon",
      "class-panel-" + ele.playerNumber
    );

    combatTimelineDiv.appendChild(iconDiv);
  });

  updatePlayerPanelActiveTurn(combatTimeline, 0);
}

function updatePlayerPanelActiveTurn(combatTimeline, turn) {
  let combatTimelineDiv, previousClass;
  combatTimelineDiv = document.getElementById("combat-timeline-icons-box");
  previousClass = combatTimelineDiv.querySelector(".player-panel-active-turn");

  if (previousClass) previousClass.classList.remove("player-panel-active-turn");

  // BUG: the issue with getting the class is that all the zombies and such has the same class here...
  combatTimelineDiv
    .getElementsByClassName(
      "class-panel-" + combatTimeline[turn].playerNumber
    )[0]
    .classList.add("player-panel-active-turn");
  combatTimelineDiv.scrollBy(60, 0);

  if (Game.turn === 0) {
    combatTimelineDiv.scrollBy(-600, 0);
  }
}
