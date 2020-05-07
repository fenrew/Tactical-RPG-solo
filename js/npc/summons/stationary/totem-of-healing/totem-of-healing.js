class TotemOfHealing extends BaseClass {
  constructor() {
    super();
    this.className = "totem-of-healing";
    this.cssString = "totem-of-healing-summon-player-area";
    this.cssPlayerPanelString = "totem-of-healing-summon-combat-timeline-panel";
    this.combatStyle = "passive";
    this.player = "";

    this.ai = new stationaryPassiveAi();

    this.combatstats = {
      hp: 100,
      currentHp: 100,
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

    this.spells = {
      healAoe: {
        id: "healAoe",
        name: "Heal Aoe",
        cast: (position) => {
          this._addTargetSpellConditions(this.spells.healAoe, position);
        },
        castEffect: (target, spell, player) => {
          const allNearbyTargets = getUnitsInFreeRange(target, 3);

          allNearbyTargets.forEach((ele) => {
            const { combatstats } = ele.class;
            let modifiedHealing = Math.floor(
              spell.spellInfo.damage *
                calculateHealingModifiers(player.player, ele)
            );

            combatstats.currentHp += modifiedHealing;

            if (combatstats.currentHp > combatstats.hp) {
              combatstats.currentHp = combatstats.hp;
            }

            handleSpellDamageEffectAnimation(
              ele,
              modifiedHealing,
              spell.spellInfo.type
            );
          });

          return modifiedHealing;
        },
        spellInfo: {
          learned: true,
          canBeCast: true,
          type: "healing",
          manaCost: 20,
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
        castCounter: 0,
      },
    };
  }
}