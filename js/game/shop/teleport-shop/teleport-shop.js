const teleportToShop = (player, shopNumber) => {
  const { y, x } = player.position;

  player.shop = shopNumber;

  if (shopNumber === 28) {
    Game.shopWeaponry = Game.activeMap;
    Game.activeMap = shopMapWeaponry;
  } else if (shopNumber === 29) {
    Game.shopMisc = Game.activeMap;
    Game.activeMap = shopMapMisc;
  }

  Game.activeMap[y][x] = player.playerNumber;
  updateVisualizeMap(Game.activeMap);
  visualizePlayers(Game.activeMap);
  addOnclickToNpcs(); // Is this really needed???
  addOnClickShops(Game.activeMap);
};

const teleportFromShop = (player) => {
  const shopNumber = player.shop;
  const { y, x } = player.position;
  player.shop = false;

  Game.activeMap[y][x] = shopNumber;
  if (shopNumber === 28) {
    Game.activeMap = Game.shopWeaponry;
    Game.shopWeaponry = false;
  } else if (shopNumber === 29) {
    Game.activeMap = Game.shopMisc;
    Game.shopMisc = false;
  }

  updateVisualizeMap(Game.activeMap);
  visualizePlayers(Game.activeMap);
  addOnClickPlayers();
  addOnclickToNpcs();
};
