function handleSpellDamageEffectAnimation(target, effectValue, effect) {
  // const positionX = originalPos ? originalPos.x : target.position.x
  // const positionY = originalPos ? originalPos.y : target.position.y
  let element = document.getElementById(
    `${target.npc ? "npc" : "player"}-${target.position.y},${target.position.x}`
  );

  let newElement = document.createElement("div");
  if (effectValue === 0) {
    newElement.classList.add("display-damage-immune");
    effectValue = "Immune";
  } else if (effect == "damage" && effectValue >= 0) {
    newElement.classList.add("display-damage-dealt");
  } else if (effect == "healing" || (effect == "damage" && effectValue < 0)) {
    newElement.classList.add("display-healing-done");
  } else if (effect == "manadrain") {
    newElement.classList.add("display-mana-drained");
  } else if (effect == "managain") {
    newElement.classList.add("display-mana-gained");
  } else if (effect == "mp") {
    newElement.classList.add("display-movement-changed");
  }

  newElement.classList.add("display-damage-dealt-numbers");

  newElement.innerHTML = String(
    typeof effectValue === "number" ? Math.abs(effectValue) : effectValue
  );
  element.appendChild(newElement);

  updateCurrentManaBar(target);
  updateCurrentHealthBar(target);
  element.querySelector(".max-health-div").classList.add("max-health-div-show");
  setTimeout(() => {
    element
      .querySelector(".max-health-div")
      .classList.remove("max-health-div-show");
    element.removeChild(newElement);
  }, 2000);
}
