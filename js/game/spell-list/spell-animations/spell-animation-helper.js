const spellAnimationHelperAdd = (position, aniClassStr) => {
  const { y, x } = position;
  const targetDiv = document.getElementById(`map-grid-block-${y},${x}`);
  const newAniEle = document.createElement("div");

  newAniEle.classList.add(aniClassStr, "spell-animation-general");

  targetDiv.appendChild(newAniEle);

  return { targetDiv, newAniEle };
};

const spellAnimationHelperRemove = (eleObj) => {
  const { targetDiv, newAniEle } = eleObj;
  targetDiv.removeChild(newAniEle);
};

const projectileAnimationHelperDirection = (target, player) => {
  const positionRelativeX = target.position.x - player.position.x;
  const positionRelativeY = target.position.y - player.position.y;

  console.log(Math.abs(positionRelativeX), Math.abs(positionRelativeY))

  return {
    direction:
      Math.abs(positionRelativeX) >= Math.abs(positionRelativeY)
        ? "horizontal"
        : "vertical",
    y: positionRelativeY,
    x: positionRelativeX,
  };
};

const spellCastAnimationHelperDirection = (target, player) => {
  const positionRelativeX = player.position.x - target.position.x;
  const positionRelativeY = player.position.y - target.position.y;

  if (positionRelativeX > Math.abs(positionRelativeY)) return "west";
  // W
  else if (Math.abs(positionRelativeX) > Math.abs(positionRelativeY)) return "east"; // E
  if (positionRelativeY > 0) return "north";
  // N
  else if (positionRelativeY < 0) return "south"; // S
};

const createAnimationEleAndTransition = (target, player, spellCssStr) => {
  const projectile = projectileAnimationHelperDirection(target, player)
  const playerDir = spellCastAnimationHelperDirection(target, player)
  const playerEle = document.getElementById(`${player.npc ? "npc" : "player"}-${player.position.y},${player.position.x}`)
  const blockEle = document.getElementById(`map-grid-block-${player.position.y},${player.position.x}`)
  const newProjectileEle = document.createElement("div")

  newProjectileEle.classList.add(`spell-animation-${spellCssStr}-projectile-${playerDir}`, "spell-animation-general")
  playerEle.classList.add(`spell-animation-${spellCssStr}-${playerDir}`)

  const transitionTime = Math.abs(Math.abs(projectile.x) >= Math.abs(projectile.y) ? projectile.x : projectile.y)
  newProjectileEle.style.transition = `top ${transitionTime/10}s linear, left ${transitionTime/10}s linear`

  blockEle.appendChild(newProjectileEle)
  return {blockEle, playerEle, newProjectileEle, transitionTime, playerDir, projectile}
}