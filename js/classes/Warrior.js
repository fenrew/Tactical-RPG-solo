class Warrior extends BaseClass {
  constructor(player) {
    super();
    this.className = "Warrior";
    this.cssString = "warrior-player-area";
    this.cssPlayerPanelString = "warrior-class-player-panel";
    this.player = player;

    this.combatstats = {
      hp: 450,
      currentHp: 450,
      mana: 120,
      currentMana: 120,
      initiation: 250,
      maxMovementPoints: 5,
      currentMovementPoints: 5,
    };

    this.conditions = {
      silenced: false,
      disarmed: false,
      onAttack: [],
      onDefense: [],
    };

    this.modifiers = {
      defensive: {
        allDamage: 1,
        magicalDamage: {
          allDamage: 1.1,
          elementalMagic: {
            fire: 1,
            frost: 1,
            arcane: 1,
            holy: 1,
            nature: 1,
            darkness: 1,
          },
        },
        physicalDamage: {
          allDamage: 0.9,
          rangedDamage: 1,
          meleeDamage: 1,
          bleeds: 1,
        },
      },
      offensive: {
        allDamage: 1,
        magicalDamage: {
          allDamage: 1,
          elementalMagic: {
            fire: 1,
            frost: 1,
            arcane: 1,
            holy: 1,
            nature: 1,
            darkness: 1,
          },
        },
        physicalDamage: {
          allDamage: 1,
          rangedDamage: 1,
          meleeDamage: 1,
          bleeds: 1,
        },
      },
      healing: {
        recieved: 1,
        casterModifier: 1,
      },
      threat: 1,
    };

    this.castCounter = {
      defense: 0,
      fighter: 0,
      blood: 0,
    };

    this.spells = {
      shieldBash: {
        ...warriorSpellObject.shieldBash,
        userSpellInfo: { ...warriorSpellObject.shieldBash.userSpellInfo },
      },
      disarm: {
        ...warriorSpellObject.disarm,
        userSpellInfo: { ...warriorSpellObject.disarm.userSpellInfo },
      },
      shieldSlam: {
        ...warriorSpellObject.shieldSlam,
        userSpellInfo: { ...warriorSpellObject.shieldSlam.userSpellInfo },
      },
      selfSufficiency: {
        ...warriorSpellObject.selfSufficiency,
        userSpellInfo: { ...warriorSpellObject.selfSufficiency.userSpellInfo },
      },

      slash: {
        ...warriorSpellObject.slash,
        userSpellInfo: { ...warriorSpellObject.slash.userSpellInfo },
      },
      whirlwind: {
        ...warriorSpellObject.whirlwind,
        userSpellInfo: { ...warriorSpellObject.whirlwind.userSpellInfo },
      },
      artOfCombat: {
        ...warriorSpellObject.artOfCombat,
        userSpellInfo: { ...warriorSpellObject.artOfCombat.userSpellInfo },
      },
      hamstring: {
        ...warriorSpellObject.hamstring,
        userSpellInfo: { ...warriorSpellObject.hamstring.userSpellInfo },
      },
      sweepingStrikes: {
        ...warriorSpellObject.sweepingStrikes,
        userSpellInfo: { ...warriorSpellObject.sweepingStrikes.userSpellInfo },
      },

      absorptionStrike: {
        ...warriorSpellObject.absorptionStrike,
        userSpellInfo: { ...warriorSpellObject.absorptionStrike.userSpellInfo },
      },
      jointStrike: {
        ...warriorSpellObject.jointStrike,
        userSpellInfo: { ...warriorSpellObject.jointStrike.userSpellInfo },
      },
      painSuppression: {
        ...warriorSpellObject.painSuppression,
        userSpellInfo: { ...warriorSpellObject.painSuppression.userSpellInfo },
      },
      amurStrike: {
        ...warriorSpellObject.amurStrike,
        userSpellInfo: { ...warriorSpellObject.amurStrike.userSpellInfo },
      },
      lifeTransfer: {
        ...warriorSpellObject.lifeTransfer,
        userSpellInfo: { ...warriorSpellObject.lifeTransfer.userSpellInfo },
      },
      punishment: {
        ...warriorSpellObject.punishment,
        userSpellInfo: { ...warriorSpellObject.punishment.userSpellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
