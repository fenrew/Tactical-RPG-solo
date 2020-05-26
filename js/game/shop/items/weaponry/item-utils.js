const getKeySequence = (stat) => {
  if (stat === "hp") return ["combatstats", "hp"];
  if (stat === "mana") return ["combatstats", "mana"];

  if (stat === "offAllDamageM")
    return ["modifiers", "offensive", "magicalDamage", "allDamage"];
  if (stat === "offCasterModifier")
    return ["modifiers", "offensive", "healing", "casterModifier"];

  if (stat === "offMeleeDamage")
    return ["modifiers", "offensive", "physicalDamage", "meleeDamage"];

  if (stat === "defAllDamage") return ["modifiers", "defensive", "allDamage"];
  if (stat === "defAllDamageM")
    return ["modifiers", "defensive", "magicalDamage", "allDamage"];
  if (stat === "defDarkness")
    return [
      "modifiers",
      "defensive",
      "magicalDamage",
      "elementalMagic",
      "darkness",
    ];

  if (stat === "defHoly")
    return [
      "modifiers",
      "defensive",
      "magicalDamage",
      "elementalMagic",
      "holy",
    ];
};
