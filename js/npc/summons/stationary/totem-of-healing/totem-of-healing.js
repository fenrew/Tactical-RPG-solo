class totemOfHealing {
  constructor() {
    this.className = "totem-of-healing";
    this.cssString = "totem-of-healing-summon-player-area";
    this.cssPlayerPanelString = "totem-of-healing-summon-combat-timeline-panel";
    this.combatStyle = "passive";
    this.player = "";

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
  }
}
