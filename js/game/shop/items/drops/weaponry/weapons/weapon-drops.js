const weaponDropList = {
  boneClub: {
    name: "Bone Club",
    price: 100,
    type: "weapon",
    description: "A club made out of bones. There's a cerain stench to it",
    dropChance: 0.1,
    stats: [
      {
        keySequence: "offMeleeDamage",
        value: 0.3,
      },
      {
        keySequence: "hp",
        value: -25,
      },
    ],
  },
  swordOfTheBrotherhood: {
    name: "Sword of the Brothergood",
    price: 100,
    type: "weapon",
    description:
      "A sword once owned by one of the recuits of the Shining Brotherhood",
    dropChance: 0.02,
    stats: [
      {
        keySequence: "offMeleeDamage",
        value: 0.2,
      },
      {
        keySequence: "offHoly",
        value: 0.3,
      },
      {
        keySequence: "healing",
        value: 0.2,
      },
      {
        keySequence: "hp",
        value: 20,
      },
      {
        keySequence: "mana",
        value: 10,
      },
    ],
  },
  staffOfFire: {
    name: "Staff of Fire",
    price: 100,
    type: "weapon",
    description: "A staff that is brilliant for fire magic",
    dropChance: 0.03,
    stats: [
      {
        keySequence: "offFire",
        value: 0.3,
      },
      {
        keySequence: "hp",
        value: -15,
      },
      {
        keySequence: "mana",
        value: 15,
      },
    ],
  },
};
