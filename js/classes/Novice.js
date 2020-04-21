class Novice {
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

  async _addTargetSpellConditions(spell, position) {
    if (checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast");

    let target = Game._getUnitByPosition(position);
    if (!target && !spell.spellInfo.glyphNumber)
      return console.log("No target");

    this.combatstats.currentMana -= spell.spellInfo.manaCost;

    spell.castCounter += 1;
    this.castCounter[spell.category] += 1;
    this._checkIfNewSpellIsLearned(spell);

    if (noviceSpellAnimations[spell.id])
      await noviceSpellAnimations[spell.id](target, this.player);

    let modifiedDamage = await spell.castEffect(
      target ? target : position,
      spell,
      this
    );

    updateCurrentManaBar(this.player);

    if (target?.newPosition) {
      target.position = { ...target.newPosition };
      target.newPosition = false;
    }

    if (modifiedDamage) {
      console.log(modifiedDamage, "modifieddamage");
      handleSpellDamageEffectAnimation(
        target,
        modifiedDamage,
        spell.spellInfo.type
      );
    }

    this._checkIfPromotionToNewClass();
  }

  _checkIfNewSpellIsLearned(spell) {
    for (let catKey in this.castCounter) {
      for (let spellKey in this.spells) {
        if (
          this.castCounter[catKey] === this.spells[spellKey].toLearn &&
          catKey === this.spells[spellKey].category &&
          !this.spells[spellKey].spellInfo.learned
        ) {
          console.log("NEW SPELL LEARNED!");
          this.spells[spellKey].spellInfo.learned = true;
        }
      }
    }
  }

  _checkIfPromotionToNewClass() {
    let totalCastCounter = 0;
    for (let category in this.castCounter) {
      for (let spell in this.spells) {
        if (
          category === this.spells[spell].category &&
          this.castCounter[category] === this.spells[spell].toLearn &&
          !this.spells[spell].spellInfo.learned
        ) {
          this.spells[spell].spellInfo.learned = true;
        }
      }
    }

    if (totalCastCounter > 2) {
      const spellKeys = Object.keys(this.spells);
      spellKeys.sort(
        (a, b) => this.spells[b].castCounter - this.spells[a].castCounter
      );
      if (spellKeys[0] === "throwStaff" || spellKeys[0] === "forceStaff") {
      } else if (
        spellKeys[0] === "slam" ||
        spellKeys[0] === "defensiveStance"
      ) {
      } else if (
        spellKeys[0] === "conjureFrost" ||
        spellKeys[0] === "heatwave"
      ) {
      } else {
      }
    }
  }
}
