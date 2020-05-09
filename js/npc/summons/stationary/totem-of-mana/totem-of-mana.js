class TotemOfMana extends BaseClass {
  constructor() {
    super();
    this.className = "totem-of-mana";
    this.cssString = "totem-of-mana-summon-player-area";
    this.cssPlayerPanelString = "totem-of-mana-summon-combat-timeline-panel";
    this.player = "";

    this.ai = new stationaryActiveAi(this);

    this.combatstats = {
      hp: 120,
      currentHp: 120,
      mana: 100,
      currentMana: 100,
      initiation: 0,
      maxMovementPoints: -100,
      currentMovementPoints: -100,
    };

    this.conditions = {
      silenced: false,
      disarmed: false,
      immovable: true,
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
      totem: 0,
    };

    this.spells = {
      manaAoe: {
        id: "manaAoe",
        name: "Mana Aoe",
        cast: (position) => {
          this._addTargetSpellConditions(this.spells.manaAoe, position);
        },
        castEffect: (target, spell, player) => {
          const allNearbyTargets = getUnitsInFreeRange(
            target,
            spell.spellInfo.aoeRange
          );

          allNearbyTargets.forEach((ele) => {
            const { combatstats } = ele.class;

            combatstats.currentMana += spell.spellInfo.damage;

            if (combatstats.currentMana > combatstats.mana) {
              combatstats.currentMana = combatstats.mana;
            }

            handleSpellDamageEffectAnimation(
              ele,
              spell.spellInfo.damage,
              spell.spellInfo.type
            );
          });
        },
        spellInfo: {
          aoeRange: 4,
          castOnNoTarget: true,
          aiWeight: 10,
          learned: true,
          canBeCast: true,
          type: "managain",
          manaCost: 80,
          damage: 60,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 0,
          maxRange: 0,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 1,
          castsPerTurn: 1,
          conditionsRequirements: {
            silenced: true,
          },
        },
        toLearn: 0,
        category: "totem",
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass() {}
}
