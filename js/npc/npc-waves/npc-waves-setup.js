function addNewNpcToMap(round) {
  if (round === 1) {
    let npcArray = [];

    for (let i = 0; i <= 0; i++) {
      let newNpc = new NpcModel(new Zombie(), 70);
      newNpc._initiate();
      npcArray.push(newNpc);

      let newGoul = new NpcModel(new Goul(), 71);
      newGoul._initiate();
      npcArray.push(newGoul);
    }

    return Game._addNpcToGame(npcArray);
  } else if (round === 2) {
    let npcArray = [];

    for (let i = 0; i <= 2; i++) {
      let newNpc = new NpcModel(new Zombie(), 70);
      newNpc._initiate();

      npcArray.push(newNpc);
    }

    return Game._addNpcToGame(npcArray);
  } else if (round === 3) {
    let npcArray = [];

    for (let i = 0; i <= 2; i++) {
      let newNpc = new NpcModel(new Zombie(), 70);
      newNpc._initiate();

      // npcArray.push(newNpc)
    }

    return Game._addNpcToGame(npcArray);
  } else if (round === 4) {
    let npcArray = [];

    for (let i = 0; i <= 2; i++) {
      let newNpc = new NpcModel(new Zombie(), 70);
      newNpc._initiate();

      //  npcArray.push(newNpc)
    }

    return Game._addNpcToGame(npcArray);
  }
}
