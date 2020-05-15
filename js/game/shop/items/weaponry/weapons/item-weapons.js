const itemWeaponsList = {
  dirk: {
    price: 100,
    stats: [
      {
        keySequence: [
          "damageModifiers",
          "offensive",
          "magicalDamage",
          "allDamage",
        ],
        value: 0.1,
      },
      {
        keySequence: [
          "damageModifiers",
          "offensive",
          "physicalDamage",
          "meleeDamage",
        ],
        value: 0.1,
      },
      {
        keySequence: ["combatstats", "mana"],
        value: 25,
      },
    ],
  },
  staffOfMagic: {
    price: 200,
    stats: [
      {
        keySequence: [
          "damageModifiers",
          "offensive",
          "magicalDamage",
          "allDamage",
        ],
        value: 0.2,
      },
    ],
  },
  staffOfHealing: {
    price: 200,
    stats: [
      {
        keySequence: [
          "damageModifiers",
          "offensive",
          "healing",
          "casterModifier",
        ],
        value: 0.15,
      },
      {
        keySequence: ["combatstats", "mana"],
        value: 25,
      },
    ],
  },
};
