class Priest extends BaseClass {
  constructor(player) {
    super();
    this.className = "Priest";
    this.cssString = "priest-player-area";
    this.cssPlayerPanelString = "priest-class-player-panel";
    this.player = player;

    this.combatstats = {
      hp: 300,
      currentHp: 300,
      mana: 220,
      currentMana: 220,
      initiation: 230,
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
        recieved: 1.1,
        casterModifier: 1.1,
      },
    };

    this.castCounter = {
      holy: 0,
      smite: 0,
      voodoo: 0,
    };

    this.spells = {
      renew: {
        ...priestSpellObject.renew,
        spellInfo: { ...priestSpellObject.renew.spellInfo },
      },
      holyLight: {
        ...priestSpellObject.holyLight,
        spellInfo: { ...priestSpellObject.holyLight.spellInfo },
      },
      selfPreservation: {
        ...priestSpellObject.selfPreservation,
        spellInfo: { ...priestSpellObject.selfPreservation.spellInfo },
      },
      holyGround: {
        ...priestSpellObject.holyGround,
        spellInfo: { ...priestSpellObject.holyGround.spellInfo },
      },
      blessing: {
        ...priestSpellObject.blessing,
        spellInfo: { ...priestSpellObject.blessing.spellInfo },
      },
      divinity: {
        ...priestSpellObject.divinity,
        spellInfo: { ...priestSpellObject.divinity.spellInfo },
      },

      holyFire: {
        ...priestSpellObject.holyFire,
        spellInfo: { ...priestSpellObject.holyFire.spellInfo },
      },
      purgatory: {
        ...priestSpellObject.purgatory,
        spellInfo: { ...priestSpellObject.purgatory.spellInfo },
      },
      beamOfLight: {
        ...priestSpellObject.beamOfLight,
        spellInfo: { ...priestSpellObject.beamOfLight.spellInfo },
      },
      sin: {
        ...priestSpellObject.sin,
        spellInfo: { ...priestSpellObject.sin.spellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
