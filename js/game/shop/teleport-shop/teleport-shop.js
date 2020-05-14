const teleportToShop = (player) => {
  const shopNumber = Game.activeMap[player.position.y][player.position.x];
  if (shopNumber !== 28 || shopNumber !== 29)
    return console.log("Can't teleport here");

  player.shop = shopNumber;
};

const changeDisplayedMap = (shopNumber) => {};

const teleportFromShop = (player) => {
  player.shop = false;
};
