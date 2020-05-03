class Sorcerer extends BaseClass {
  constructor(player) {
    super()
    this.className = "Sorcerer";
    this.cssString = "wizard-player-area";
    this.cssPlayerPanelString = "wizard-class-player-panel";
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
        spellInfo: { ...sorcererSpellObject.frostbolt.spellInfo },
      },
      frostbite: {
        ...sorcererSpellObject.frostbite,
        spellInfo: { ...sorcererSpellObject.frostbite.spellInfo },
      },
      freezingGround: {
        ...sorcererSpellObject.freezingGround,
        spellInfo: { ...sorcererSpellObject.freezingGround.spellInfo },
      },
      snowstorm: {
        ...sorcererSpellObject.snowstorm,
        spellInfo: { ...sorcererSpellObject.snowstorm.spellInfo },
      },
      iceWall: {
        ...sorcererSpellObject.iceWall,
        spellInfo: { ...sorcererSpellObject.iceWall.spellInfo },
      },

      firebolt: {
        ...sorcererSpellObject.firebolt,
        spellInfo: { ...sorcererSpellObject.firebolt.spellInfo },
      },
      fireSpheres: {
        ...sorcererSpellObject.fireSpheres,
        spellInfo: { ...sorcererSpellObject.fireSpheres.spellInfo },
      },
      glimmeringFlash: {
        ...sorcererSpellObject.glimmeringFlash,
        spellInfo: { ...sorcererSpellObject.glimmeringFlash.spellInfo },
      },
      pyroclasm: {
        ...sorcererSpellObject.pyroclasm,
        spellInfo: { ...sorcererSpellObject.pyroclasm.spellInfo },
      },
      fireArmor: {
        ...sorcererSpellObject.fireArmor,
        spellInfo: { ...sorcererSpellObject.fireArmor.spellInfo },
      },

      arcanePolarization: {
        ...sorcererSpellObject.arcanePolarization,
        spellInfo: { ...sorcererSpellObject.arcanePolarization.spellInfo },
      },
      flamingWeapon: {
        ...sorcererSpellObject.flamingWeapon,
        spellInfo: { ...sorcererSpellObject.flamingWeapon.spellInfo },
      },
      hurricane: {
        ...sorcererSpellObject.hurricane,
        spellInfo: { ...sorcererSpellObject.hurricane.spellInfo },
      },
      iceArmor: {
        ...sorcererSpellObject.iceArmor,
        spellInfo: { ...sorcererSpellObject.iceArmor.spellInfo },
      },
      teleport: {
        ...sorcererSpellObject.teleport,
        spellInfo: { ...sorcererSpellObject.teleport.spellInfo },
      },
    };
  }

  _checkIfNewSpellIsLearned() {
    for (let catKey in this.castCounter) {
      for (let spellKey in this.spells) {
        if (
          this.castCounter[catKey] === this.spells[spellKey].toLearn &&
          catKey === this.spells[spellKey].category &&
          !this.spells[spellKey].spellInfo.learned
        ) {
          this.spells[spellKey].spellInfo.learned = true;

          displayLearnedNewSpell(this.spells[spellKey]);
        }
      }
    }
  }

  _checkIfPromotionToNewClass() {}
}
