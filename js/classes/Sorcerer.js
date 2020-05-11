class Sorcerer extends BaseClass {
  constructor(player) {
    super();
    this.className = "Sorcerer";
    this.cssString = "sorcerer-player-area";
    this.cssPlayerPanelString = "sorcerer-class-player-panel";
    this.player = player;

    this.combatstats = {
      hp: 300,
      currentHp: 300,
      mana: 200,
      currentMana: 200,
      initiation: 150,
      maxMovementPoints: 4,
      currentMovementPoints: 4,
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
          allDamage: 0.9,
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
          allDamage: 1.1,
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
      frost: 0,
      fire: 0,
      battleMage: 0,
    };

    this.spells = {
      frostbolt: {
        ...sorcererSpellObject.frostbolt,
        userSpellInfo: { ...sorcererSpellObject.frostbolt.userSpellInfo },
      },
      frostbite: {
        ...sorcererSpellObject.frostbite,
        userSpellInfo: { ...sorcererSpellObject.frostbite.userSpellInfo },
      },
      freezingGround: {
        ...sorcererSpellObject.freezingGround,
        userSpellInfo: { ...sorcererSpellObject.freezingGround.userSpellInfo },
      },
      snowstorm: {
        ...sorcererSpellObject.snowstorm,
        userSpellInfo: { ...sorcererSpellObject.snowstorm.userSpellInfo },
      },
      iceWall: {
        ...sorcererSpellObject.iceWall,
        userSpellInfo: { ...sorcererSpellObject.iceWall.userSpellInfo },
      },

      firebolt: {
        ...sorcererSpellObject.firebolt,
        userSpellInfo: { ...sorcererSpellObject.firebolt.userSpellInfo },
      },
      fireSpheres: {
        ...sorcererSpellObject.fireSpheres,
        userSpellInfo: { ...sorcererSpellObject.fireSpheres.userSpellInfo },
      },
      glimmeringFlash: {
        ...sorcererSpellObject.glimmeringFlash,
        userSpellInfo: { ...sorcererSpellObject.glimmeringFlash.userSpellInfo },
      },
      pyroclasm: {
        ...sorcererSpellObject.pyroclasm,
        userSpellInfo: { ...sorcererSpellObject.pyroclasm.userSpellInfo },
      },
      fireArmor: {
        ...sorcererSpellObject.fireArmor,
        userSpellInfo: { ...sorcererSpellObject.fireArmor.userSpellInfo },
      },

      arcanePolarization: {
        ...sorcererSpellObject.arcanePolarization,
        userSpellInfo: {
          ...sorcererSpellObject.arcanePolarization.userSpellInfo,
        },
      },
      flamingWeapon: {
        ...sorcererSpellObject.flamingWeapon,
        userSpellInfo: { ...sorcererSpellObject.flamingWeapon.userSpellInfo },
      },
      hurricane: {
        ...sorcererSpellObject.hurricane,
        userSpellInfo: { ...sorcererSpellObject.hurricane.userSpellInfo },
      },
      iceArmor: {
        ...sorcererSpellObject.iceArmor,
        userSpellInfo: { ...sorcererSpellObject.iceArmor.userSpellInfo },
      },
      teleport: {
        ...sorcererSpellObject.teleport,
        userSpellInfo: { ...sorcererSpellObject.teleport.userSpellInfo },
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
