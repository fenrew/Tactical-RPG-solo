class Novice extends BaseClass {
  constructor(player) {
    super();
    this.className = "Novice";
    this.cssString = "novice-player-area";
    this.cssPlayerPanelString = "novice-class-player-panel";
    this.player = player;

    this.combatstats = {
      hp: 250,
      currentHp: 250,
      mana: 100,
      currentMana: 100,
      initiation: 100,
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
        recieved: 1,
        casterModifier: 1,
      },
    };

    this.castCounter = {
      warrior: 0,
      ranger: 0,
      sorcerer: 0,
      priest: 0,
    };

    this.spells = {
      slam: {
        ...noviceSpellObject.slam,
        userSpellInfo: { ...noviceSpellObject.slam.userSpellInfo },
      },
      defensiveStance: {
        ...noviceSpellObject.defensiveStance,
        userSpellInfo: { ...noviceSpellObject.defensiveStance.userSpellInfo },
      },
      rend: {
        ...noviceSpellObject.rend,
        userSpellInfo: { ...noviceSpellObject.rend.userSpellInfo },
      },
      powerStroke: {
        ...noviceSpellObject.powerStroke,
        userSpellInfo: { ...noviceSpellObject.powerStroke.userSpellInfo },
      },
      findWeakness: {
        ...noviceSpellObject.findWeakness,
        userSpellInfo: { ...noviceSpellObject.findWeakness.userSpellInfo },
      },

      throwStaff: {
        ...noviceSpellObject.throwStaff,
        userSpellInfo: { ...noviceSpellObject.throwStaff.userSpellInfo },
      },
      forceStaff: {
        ...noviceSpellObject.forceStaff,
        userSpellInfo: { ...noviceSpellObject.forceStaff.userSpellInfo },
      },

      conjureFrost: {
        ...noviceSpellObject.conjureFrost,
        userSpellInfo: { ...noviceSpellObject.conjureFrost.userSpellInfo },
      },
      heatwave: {
        ...noviceSpellObject.heatwave,
        userSpellInfo: { ...noviceSpellObject.heatwave.userSpellInfo },
      },
      magicLance: {
        ...noviceSpellObject.magicLance,
        userSpellInfo: { ...noviceSpellObject.magicLance.userSpellInfo },
      },
      syphonMana: {
        ...noviceSpellObject.syphonMana,
        userSpellInfo: { ...noviceSpellObject.syphonMana.userSpellInfo },
      },
      powerSpike: {
        ...noviceSpellObject.powerSpike,
        userSpellInfo: { ...noviceSpellObject.powerSpike.userSpellInfo },
      },

      heal: {
        ...noviceSpellObject.heal,
        userSpellInfo: { ...noviceSpellObject.heal.userSpellInfo },
      },
      inspire: {
        ...noviceSpellObject.inspire,
        userSpellInfo: { ...noviceSpellObject.inspire.userSpellInfo },
      },
      smite: {
        ...noviceSpellObject.smite,
        userSpellInfo: { ...noviceSpellObject.smite.userSpellInfo },
      },
      absorb: {
        ...noviceSpellObject.absorb,
        userSpellInfo: { ...noviceSpellObject.absorb.userSpellInfo },
      },
      holySpike: {
        ...noviceSpellObject.holySpike,
        userSpellInfo: { ...noviceSpellObject.holySpike.userSpellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
