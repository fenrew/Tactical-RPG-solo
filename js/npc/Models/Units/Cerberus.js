class Cerberus extends BaseClass {
  constructor() {
    super();
    this.className = "cerberus";
    this.cssString = "cerberus-npc-player-area";
    this.cssPlayerPanelString = "cerberus-npc-combat-timeline-panel";
    this.player = "";

    this.cooldowns = []; // An array of all spells that are on cooldown
    this.taunted = false; // The player class of whoever taunted you

    this.ai = new NewAggressiveAi();

    this.dropTable = {
      coins: [60, 80],
      items: [
        weaponDropList.swordOfTheBrotherhood,
        weaponDropList.staffOfFire,
        legsDropList.raggedPants,
        legsDropList.leggingsOfTheOld,
        helmetDropList.coifOfTheOld,
        helmetDropList.boneStrapedBoots,
        chestDropList.bonePlate,
        shoulderDropList.plaguedPauldrons,
      ],
    };

    this.combatstats = {
      hp: 400,
      currentHp: 400,
      mana: 60,
      currentMana: 60,
      initiation: 240,
      maxMovementPoints: 5,
      currentMovementPoints: 5,
    };

    this.conditions = {
      silenced: false,
      disarmed: false,
      onAttack: [],
      onDefense: [],
    };

    this.modifiers = {
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
      threeHeadedBite: {
        id: "threeHeadedBite",
        name: "Three Headed Bite",
        cast: (position, player) => {
          player._addTargetSpellConditions(
            player.spells.threeHeadedBite,
            position
          );
        },
        castEffect: (target, spell, player) => {
          const allNearbyTargets = getUnitsInFreeRange(player.player, 1);
          const { damage, type } = spell.spellInfo;

          allNearbyTargets.forEach((ele) => {
            let modifiedDamage = Math.floor(
              damage * calculatePhysicalMeleeDamageModifiers(player.player, ele)
            );

            ele.class.combatstats.currentHp -= modifiedDamage;

            handleSpellDamageEffectAnimation(ele, modifiedDamage, type);
          });
        },
        spellInfo: {
          aiWeight: 10,
          type: "damage",
          source: "physical-melee",
          manaCost: 35,
          damage: 60,
          freeCells: true,
          straigthLine: false,
          diagonal: false,
          areaOfEffect: 1,
          minRange: 1,
          maxRange: 1,
          modifiableRange: false,
          lineOfSight: false,
          cooldown: 1,
          castsPerTurn: 2,
          castsPerTarget: 2,
          conditionsRequirements: {},
        },
        userSpellInfo: {
          learned: true,
          canBeCast: true,
          currentCooldown: 0,
          currentCastsPerTurn: 0,
        },
        category: "threeHeadedBite",
        toLearn: 0,
        castCounter: 0,
      },
    };
  }

  _checkIfPromotionToNewClass = () => {};
}
