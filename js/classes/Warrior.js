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

    this.damageModifiers = {
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
    };

    this.castCounter = {
      defense: 0,
      fighter: 0,
      blood: 0,
    };

    this.spells = {
      shieldBash: {
        ...warriorSpellObject.shieldBash,
        spellInfo: { ...warriorSpellObject.shieldBash.spellInfo },
      },
      disarm: {
        ...warriorSpellObject.disarm,
        spellInfo: { ...warriorSpellObject.disarm.spellInfo },
      },
      shieldSlam: {
        ...warriorSpellObject.shieldSlam,
        spellInfo: { ...warriorSpellObject.shieldSlam.spellInfo },
      },

      slash: {
        ...warriorSpellObject.slash,
        spellInfo: { ...warriorSpellObject.slash.spellInfo },
      },
      whirlwind: {
        ...warriorSpellObject.whirlwind,
        spellInfo: { ...warriorSpellObject.whirlwind.spellInfo },
      },
      artOfCombat: {
        ...warriorSpellObject.artOfCombat,
        spellInfo: { ...warriorSpellObject.artOfCombat.spellInfo },
      },
      hamstring: {
        ...warriorSpellObject.hamstring,
        spellInfo: { ...warriorSpellObject.hamstring.spellInfo },
      },
      sweepingStrikes: {
        ...warriorSpellObject.sweepingStrikes,
        spellInfo: { ...warriorSpellObject.sweepingStrikes.spellInfo },
      },

      absorptionStrike: {
        ...warriorSpellObject.absorptionStrike,
        spellInfo: { ...warriorSpellObject.absorptionStrike.spellInfo },
      },
      jointStrike: {
        ...warriorSpellObject.jointStrike,
        spellInfo: { ...warriorSpellObject.jointStrike.spellInfo },
      },
      painSuppression: {
        ...warriorSpellObject.painSuppression,
        spellInfo: { ...warriorSpellObject.painSuppression.spellInfo },
      },
      amurStrike: {
        ...warriorSpellObject.amurStrike,
        spellInfo: { ...warriorSpellObject.amurStrike.spellInfo },
      },
      lifeTransfer: {
        ...warriorSpellObject.lifeTransfer,
        spellInfo: { ...warriorSpellObject.lifeTransfer.spellInfo },
      },
      punishment: {
        ...warriorSpellObject.punishment,
        spellInfo: { ...warriorSpellObject.punishment.spellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
