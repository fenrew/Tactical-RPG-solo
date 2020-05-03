class Novice extends BaseClass {
  constructor(player) {
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
        spellInfo: { ...noviceSpellObject.slam.spellInfo },
      },
      defensiveStance: {
        ...noviceSpellObject.defensiveStance,
        spellInfo: { ...noviceSpellObject.defensiveStance.spellInfo },
      },
      rend: {
        ...noviceSpellObject.rend,
        spellInfo: { ...noviceSpellObject.rend.spellInfo },
      },
      powerStroke: {
        ...noviceSpellObject.powerStroke,
        spellInfo: { ...noviceSpellObject.powerStroke.spellInfo },
      },
      findWeakness: {
        ...noviceSpellObject.findWeakness,
        spellInfo: { ...noviceSpellObject.findWeakness.spellInfo },
      },

      throwStaff: {
        ...noviceSpellObject.throwStaff,
        spellInfo: { ...noviceSpellObject.throwStaff.spellInfo },
      },
      forceStaff: {
        ...noviceSpellObject.forceStaff,
        spellInfo: { ...noviceSpellObject.forceStaff.spellInfo },
      },

      conjureFrost: {
        ...noviceSpellObject.conjureFrost,
        spellInfo: { ...noviceSpellObject.conjureFrost.spellInfo },
      },
      heatwave: {
        ...noviceSpellObject.heatwave,
        spellInfo: { ...noviceSpellObject.heatwave.spellInfo },
      },
      magicLance: {
        ...noviceSpellObject.magicLance,
        spellInfo: { ...noviceSpellObject.magicLance.spellInfo },
      },
      syphonMana: {
        ...noviceSpellObject.syphonMana,
        spellInfo: { ...noviceSpellObject.syphonMana.spellInfo },
      },
      powerSpike: {
        ...noviceSpellObject.powerSpike,
        spellInfo: { ...noviceSpellObject.powerSpike.spellInfo },
      },

      heal: {
        ...noviceSpellObject.heal,
        spellInfo: { ...noviceSpellObject.heal.spellInfo },
      },
      inspire: {
        ...noviceSpellObject.inspire,
        spellInfo: { ...noviceSpellObject.inspire.spellInfo },
      },
      smite: {
        ...noviceSpellObject.smite,
        spellInfo: { ...noviceSpellObject.smite.spellInfo },
      },
      absorb: {
        ...noviceSpellObject.absorb,
        spellInfo: { ...noviceSpellObject.absorb.spellInfo },
      },
      holySpike: {
        ...noviceSpellObject.holySpike,
        spellInfo: { ...noviceSpellObject.holySpike.spellInfo },
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
