class iceWallSpell {
  constructor() {
    this.className = "ice-wall";
    this.cssString = "ice-wall-summon-player-area";
    this.cssPlayerPanelString = "ice-wall-summon-combat-timeline-panel";
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

    this.modifiers = {
      defensive: {
        allDamage: 1,
        magicalDamage: {
          allDamage: 1,
          elementalMagic: {
            fire: 5,
            frost: 0,
            arcane: 0,
            holy: 0,
            nature: 0,
            darkness: 0,
          },
        },
        physicalDamage: {
          allDamage: 0,
          rangedDamage: 0,
          meleeDamage: 0,
          bleeds: 0,
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
