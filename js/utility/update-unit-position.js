const updateUnitPosition = (unit, newPosition) => {
  const { y, x } = unit.position;
  const previousMapNumber = Game.activeMap[y][x];

  Game.activeMap[y][x] = Game.originalMap[y][x];
  Game.activeMap[newPosition.y][newPosition.x] = previousMapNumber;

  const unitDiv = document.getElementById(
    `${unit.npc ? "npc" : "player"}-${unit.position.y},${unit.position.x}`
  );
  unitDiv.parentNode.removeChild(unitDiv);

  unitDiv.id = `player-${newPosition.y},${newPosition.x}`;

  const mapGridBlockDiv = document.getElementById(
    "map-grid-block-" + newPosition.y + "," + newPosition.x
  );
  mapGridBlockDiv.appendChild(unitDiv);

  unit.position = { ...newPosition };
};

// Takes an infinite amount of units objects (with position properties) and changes the position with the next unit
// arg1 => arg2    arg2 => arg3    arg3 => arg1
const changeUnitsPosition = (...units) => {
  const unitsDiv = units.map((ele) =>
    document.getElementById(
      `${ele.npc ? "npc" : "player"}-${ele.position.y},${ele.position.x}`
    )
  );

  const unitsMapNumber = units.map(
    (ele) => Game.activeMap[ele.position.y][ele.position.x]
  );

  const unitsPositions = units.map((ele) => {
    return { ...ele.position };
  });

  units.forEach((ele, index) => {
    const nextElePos =
      units.length <= index + 1 ? unitsPositions[0] : unitsPositions[index + 1];

    const { y, x } = ele.position;

    Game.activeMap[nextElePos.y][nextElePos.x] = unitsMapNumber[index];

    unitsDiv[index].id = `player-${nextElePos.y},${nextElePos.x}`;

    const mapGridBlockDiv = document.getElementById(
      "map-grid-block-" + nextElePos.y + "," + nextElePos.x
    );

    unitsDiv[index].parentNode.removeChild(unitsDiv[index]);
    mapGridBlockDiv.appendChild(unitsDiv[index]);

    ele.position = { ...nextElePos };
  });
};
