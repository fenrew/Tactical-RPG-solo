class Warrior extends BaseClass {
    constructor(player) {
      super()
      this.className = "Warrior";
      this.cssString = "warrior-player-area";
      this.cssPlayerPanelString = "warrior-class-player-panel";
      this.player = player;
  
      this.combatstats = {
        hp: 450,
        currentHp: 450,
        mana: 120,
        currentMana: 120,
        initiation: 250,
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
            allDamage: 1.1,
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
            allDamage: 0.9,
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
        defense: 0,
        fighter: 0,
        blood: 0,
      };
  
      this.spells = {
        slash: {
          ...warriorSpellObject.slash,
          spellInfo: { ...warriorSpellObject.slash.spellInfo },
        },
      };
    }
  
    _checkIfPromotionToNewClass() {}
  }
  