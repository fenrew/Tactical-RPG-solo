const teleportToShop = (player, shopNumber) => {
  const { y, x } = player.position;

  player.shop = shopNumber;

  if (shopNumber === 28) {
    Game.shopMinerals = Game.activeMap;
    Game.activeMap = shopMapMinerals;
  } else if (shopNumber === 29) {
    Game.shopFabrics = Game.activeMap;
    Game.activeMap = shopMapFabrics;
  }

  Game.activeMap[y][x] = player.playerNumber;
  updateVisualizeMap(Game.activeMap);
};

const teleportFromShop = (player) => {
  const shopNumber = player.shop;
  player.shop = false;

  Game.activeMap[y][x] = shopNumber;
  if (shopNumber === 28) {
    Game.activeMap = Game.shopMinerals;
    Game.shopMinerals = false;
  } else if (shopNumber === 29) {
    Game.activeMap = Game.shopFabrics;
    Game.shopFabrics = false;
  }

  updateVisualizeMap(Game.activeMap);
};
