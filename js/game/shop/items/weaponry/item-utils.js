const getKeySequence = (stat) => {
  // MISC
  if (stat === "hp") return ["combatstats", "hp"];
  if (stat === "mana") return ["combatstats", "mana"];
  if (stat === "threat") return ["modifiers", "threat"];

  // OFFENSIVE
  // Offensive Caster
  if (stat === "offAllDamageM")
    return ["modifiers", "offensive", "magicalDamage", "allDamage"];
  if (stat === "offHoly")
    return [
      "modifiers",
      "offensive",
      "magicalDamage",
      "elementalMagic",
      "holy",
    ];
  if (stat === "offFrost")
    return [
      "modifiers",
      "offensive",
      "magicalDamage",
      "elementalMagic",
      "frost",
    ];
  if (stat === "offDarkness")
    return [
      "modifiers",
      "offensive",
      "magicalDamage",
      "elementalMagic",
      "darkness",
    ];
  if (stat === "offFire")
    return [
      "modifiers",
      "offensive",
      "magicalDamage",
      "elementalMagic",
      "fire",
    ];

  if (stat === "healing")
    return ["modifiers", "offensive", "healing", "casterModifier"];

  // Offensive Physical
  if (stat === "offMeleeDamage")
    return ["modifiers", "offensive", "physicalDamage", "meleeDamage"];

  // DEFNESIVE
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
