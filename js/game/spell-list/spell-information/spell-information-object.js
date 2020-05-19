const spellInfoObject = {
  // Novice
  slam: "Slams the enemy with the staff dealing physical damage",
  defensiveStance:
    "Takes up a defensive stance, reducing magical damage dealt and physical damage taken for 3 turns",
  rend:
    "Cuts a deep wound on the target making it bleed over 3 turns, dealing damage each turn",
  powerStroke:
    "Swings with brute force towards the target, dealing a massive amount of damage",
  findWeakness:
    "Exposing the enemy's weakness, increases physical damage received by the target for 2 turns",

  throwStaff: "Throws the staff at the enemy dealing ranged physical damage",
  forceStaff:
    "Hurls the staff with such force it deals true damage and pushes the target 2 tiles",

  conjureFrost:
    "Removes heat from the enemy body dealing damage and removing one MP for 1 turn",
  heatwave:
    "Conjures a heatwave at a target area dealing damage to anyone within the effect, lasts 2 turns",
  magicLance: "Hurls a magical lance dealing arcane damage to the target",
  syphonMana: "Channels some of your mana to the target",
  powerSpike:
    "Creates a power spike by consuming all the mana for the current turn and the next turn you gain it back",

  heal: "Channels blinding light to heal a target",
  inspire:
    "Inspires an ally increases the final damage it deals with 20% and heals them at the beginning of each turn, lasts 2 turns",
  smite: "Deals holy damage to the enemy",
  absorb:
    "Puts an absorbing shield on the target significantly decreasing magical damage received by the target for a short time",
  holySpike:
    "Holy spikes are sent towards the target healing allies or damaging enemies",

  // SORCERER
  frostbolt:
    "Shoots out a bolt of frost on a target dealing damage and decreasing initiation for 1 turn",
  frostbite:
    "Decreases the temperature around the target’s hands inflicting frostbite. Deals damage over time and decreases physical damage dealt by the target for 3 turns",
  freezingGround:
    "Freezes the ground decreasing movement points of all units that start or end their turn there",
  snowstorm:
    "Channels a snowstorm at a target area dealing damage to anyone within the effect, lasts 2 turns.",
  iceWall: "Puts up an immovable wall of ice",

  firebolt:
    "Shoots out a bolt of fire on a target dealing damage and makes the target take fire damage if he attacks with physical attacks",
  fireSpheres:
    "Creates balls of fire that shoots out to the nearest enemies within 5 tiles dealing damage",
  glimmeringFlash:
    "Releases a flash of bright light, blinding the opponent. Gives them a 40% chance to miss on attacks",
  pyroclasm:
    "Hurls a flaming ball on the target dealing fire damage on impact, and also deals fire damage on the beginning of each of the target’s turn for the next 2 rounds. Heals double on targets with fire armor applied",
  fireArmor:
    "If the target is hit by a fire spell, it is healed instead of taking damage for 1 turn. The health can be increased above the max hp but will be revered after 1 turn or if the target receives any other forms of healing",

  arcanePolarization:
    "Deals damage to the target in close combat and teleports it to the opposite side of the caster. If the cell is unoccupied it deals additional damage to the target and to the person on the opposite cell",
  flamingWeapon:
    "Enhances the targets weapon, dealing extra fire damage on each close combat attack",
  hurricane:
    "Channels an intense wind pushing the target back 3 squares if they are in close combat, otherwise pulls the target close. Deals additional arcane damage if the target takes pushback damage",
  iceArmor:
    "Gives frost armor to a unit increasing fire and physical resistance, and decreasing frost resistance. If the unit is hit in close combat, decrease the MP of the attacker by 1",
  teleport: "Teleports to a targeted cell",

  //WARRIOR
  shieldBash:
    "Bashes the shield dealing physical damage and decrease magical damage dealt by the target for 1 turn",
  disarm:
    "Disarms the enemy preventing them from dealing physical damage for 1 turn",
  shieldSlam: "Slams the shield on the target, dealing damage",
  selfSufficiency:
    "The Warrior gets a 10% increase in damage and 1 mp the following turn if there are no adjacent enemies at the start of the turn, and it is healed for 10% of his total hp for each adjacent enemy at the start of turn 2",

  slash: "Slashes the target in quick succession dealing damage on each hit",
  whirlwind: "Deals damage to all enemies around the warrior",
  artOfCombat:
    "Each close attack made by the warrior is followed up with an additional attack that deals damage",
  hamstring:
    "Delivers a deep cut in the targets leg dealing damage and removing 2 mp",
  sweepingStrikes:
    "For each attack used by the warrior for the next turn, it also hits all adjacent enemies",

  absorptionStrike: "Strikes the enemy and healing 3% of your max hp",
  jointStrike:
    "Strikes the enemy with such force it deals damage to the target and itself",
  painSuppression:
    "Everytime the warrior takes direct single-target damage, it also heals for 5% of max hp",
  amurStrike:
    "The first two times the spell is cast it deals an equal amount of damage to itself and the target. The third time the spell is used it deals double damage to the target and heals for 60% of the damage caused",
  lifeTransfer: "Transfers 30% of its own hp and gives it to a target",
  punishment:
    "Deals damage to an enemy. The damage is increased depending on the missing hp of the Warrior",

  //PRIEST
  renew:
    "Heals the target every turn for the duration of 3 turns. A unit can only have one renew active at a time",
  holyLight: "Heals the target a great amount",
  selfPreservation:
    "Heals yourself a great amount and also deals damage to nearby enemies",
  holyGround:
    "Places a glyph that heals any units that ends or starts their turn inside of it",
  blessing: "Increases the max hp of a unit for a short amount of time",
  divinity: "Heals every unit on the map",

  holyFire: "Deals initial damage and additional damage over 3 turns",
  purgatory:
    "Shoots out a purgatory beam that deals damage to all enemies and healing all allies in its path",
  beamOfLight:
    "Casts a beam of light out from the priest’s hand dealing damage to a target and healing the priest",
  sin:
    "Deals massive darkness damage to an enemy but also deals some damage to the priest",
  judgementDay:
    "Deals damage on every unit on odd tiles and heals every unit on even tiles from the caster",
  divineIntervention:
    "Switches position with an ally healing it and damages enemies around the newly arrived position",
  totemOfHealing:
    "Summons a static totem that pulses waves of healing every turn in a 2 square radius",
  chainLightning:
    "Casts a massive bolt of lightning that bounces between units in a 2 square radius of the target, dealing increased damage for each unit hit",
  totemOfMana:
    "Sets down a totem of mana that gives additional mana for every turn in a 2 square radius",
  voodooBrew:
    "Combines a mixture of all kinds of nasty stuff and drinks it, dealing a bit of damage to yourself but increases your magical abilities significantly",
  starfall:
    "Deals initial damage on a tile and places a glyph there. Units on the glyph takes additional damage per turn. Lasts 3 turns",
  naturesWrath:
    "Places a totem on the ground that invokes nature's wrath! Removes all mp in a targeted area rooting them to the ground and dealing massive damage, lasts 2 turns or until killed",
};
