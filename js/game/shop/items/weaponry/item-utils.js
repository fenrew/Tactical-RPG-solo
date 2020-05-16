const getKeySequence = (stat) => {
  if (stat === "hp") return ["combatstats", "hp"];
  if (stat === "mana") return ["combatstats", "mana"];

  if (stat === "offAllDamageM")
    return ["damageModifiers", "offensive", "magicalDamage", "allDamage"];
  if (stat === "offCasterModifier")
    return ["damageModifiers", "offensive", "healing", "casterModifier"];

  if (stat === "offMeleeDamage")
    return ["damageModifiers", "offensive", "physicalDamage", "meleeDamage"];
};
