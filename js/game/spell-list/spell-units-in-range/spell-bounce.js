// Takes the inital target and the bounceRange and returns an array of units hit with the bounce (ordered in when the unit is hit)
const unitsHitWithBounce = (target, bounceRange, minRange = 0) => {
  const unitBounced = [target];
  let runWhileLoop = true;
  let currentTarget = target;
  while (runWhileLoop) {
    const nearbyUnits = getUnitsInFreeRange(
      currentTarget,
      bounceRange,
      minRange
    );

    const unitHit = nearbyUnits.find((ele) => !unitBounced.includes(ele));
    if (!unitHit || nearbyUnits.length === 0) {
      runWhileLoop = false;
      break;
    }
    unitBounced.push(unitHit);
    currentTarget = unitHit;
  }
  return unitBounced;
};
