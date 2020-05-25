const getKeySequence = (stat) => {
  if (stat === "hp") return ["combatstats", "hp"];
  if (stat === "mana") return ["combatstats", "mana"];

  if (stat === "offAllDamageM")
    return ["modifiers", "offensive", "magicalDamage", "allDamage"];
  if (stat === "offCasterModifier")
    return ["modifiers", "offensive", "healing", "casterModifier"];

  if (stat === "offMeleeDamage")
    return ["modifiers", "offensive", "physicalDamage", "meleeDamage"];
};
