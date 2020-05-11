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
        userSpellInfo: { ...priestSpellObject.renew.userSpellInfo },
      },
      holyLight: {
        ...priestSpellObject.holyLight,
        userSpellInfo: { ...priestSpellObject.holyLight.userSpellInfo },
      },
      selfPreservation: {
        ...priestSpellObject.selfPreservation,
        userSpellInfo: { ...priestSpellObject.selfPreservation.userSpellInfo },
      },
      holyGround: {
        ...priestSpellObject.holyGround,
        userSpellInfo: { ...priestSpellObject.holyGround.userSpellInfo },
      },
      blessing: {
        ...priestSpellObject.blessing,
        userSpellInfo: { ...priestSpellObject.blessing.userSpellInfo },
      },
      divinity: {
        ...priestSpellObject.divinity,
        userSpellInfo: { ...priestSpellObject.divinity.userSpellInfo },
      },

      holyFire: {
        ...priestSpellObject.holyFire,
        userSpellInfo: { ...priestSpellObject.holyFire.userSpellInfo },
      },
      purgatory: {
        ...priestSpellObject.purgatory,
        userSpellInfo: { ...priestSpellObject.purgatory.userSpellInfo },
      },
      beamOfLight: {
        ...priestSpellObject.beamOfLight,
        userSpellInfo: { ...priestSpellObject.beamOfLight.userSpellInfo },
      },
      sin: {
        ...priestSpellObject.sin,
        userSpellInfo: { ...priestSpellObject.sin.userSpellInfo },
      },
      judgementDay: {
        ...priestSpellObject.judgementDay,
        userSpellInfo: { ...priestSpellObject.judgementDay.userSpellInfo },
      },
      divineIntervention: {
        ...priestSpellObject.divineIntervention,
        userSpellInfo: {
          ...priestSpellObject.divineIntervention.userSpellInfo,
        },
      },

      totemOfHealing: {
        ...priestSpellObject.totemOfHealing,
        userSpellInfo: { ...priestSpellObject.totemOfHealing.userSpellInfo },
      },
      chainLightning: {
        ...priestSpellObject.chainLightning,
        userSpellInfo: { ...priestSpellObject.chainLightning.userSpellInfo },
      },
      totemOfMana: {
        ...priestSpellObject.totemOfMana,
        userSpellInfo: { ...priestSpellObject.totemOfMana.userSpellInfo },
      },
      voodooBrew: {
        ...priestSpellObject.voodooBrew,
        userSpellInfo: { ...priestSpellObject.voodooBrew.userSpellInfo },
      },
      starfall: {
        ...priestSpellObject.starfall,
        userSpellInfo: { ...priestSpellObject.starfall.userSpellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
