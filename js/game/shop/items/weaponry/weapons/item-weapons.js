const weaponItemList = {
  dirk: {
    name: "Dirk",
    price: 100,
    type: "weapon",
    description:
      "A short dagger used to open letters or stab someones eyes out",
    stats: [
      {
        keySequence: "offAllDamageM",
        value: 0.1,
      },
      {
        keySequence: "offMeleeDamage",
        value: 0.1,
      },
      {
        keySequence: "mana",
        value: 25,
      },
    ],
  },
  staffOfMagic: {
    name: "Staff of Magic",
    price: 200,
    type: "weapon",
    stats: [
      {
        keySequence: "offAllDamageM",
        value: 0.2,
      },
      {
        keySequence: "hp",
        value: 15,
      },
    ],
  },
  staffOfHealing: {
    name: "Staff of Healing",
    price: 200,
    type: "weapon",
    stats: [
      {
        keySequence: "offCasterModifier",
        value: 0.15,
      },
      {
        keySequence: "mana",
        value: 25,
      },
    ],
  },
  ironSword: {
    name: "Iron Sword",
    price: 200,
    type: "weapon",
    stats: [
      {
        keySequence: "offMeleeDamage",
        value: 0.2,
      },
      {
        keySequence: "hp",
        value: 10,
      },
    ],
  },
};
