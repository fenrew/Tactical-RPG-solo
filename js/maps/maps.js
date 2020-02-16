// 20 = Void/emptyness
// 21 = Grass
// 22 = Sand
// 30 = Stone
// 10-19 = starting positions for players 1-10
// 20-49 = Terrain
// 20-29 = Walkable Terrain
// 30-49 = Obstacle Terrain
// 220-249 = Terrain Movement Highlight (For movement)
// 50-69 = Classes
// 0-9 = Player
// 70-90 = CPU's
// 70 = Zombie

// Highlight map:
// 0 = no highlight
// 1 = active player highlight
// 2 = inactive player highlight


const mapOne = [
    [20,20,21,21,30,21,21,21,21,21,21,21,21,21,20,20],
    [20,21,21,30,30,30,21,21,21,21,21,21,21,30,21,20],
    [21,13,21,21,21,21,21,21,21,21,22,30,21,21,21,21],
    [21,12,21,21,21,21,22,21,21,21,21,21,21,21,21,21],
    [21,10,21,21,21,22,21,22,22,21,21,22,21,21,21,21],
    [21,11,21,21,30,21,21,21,22,30,21,21,11,21,21,21],
    [21,21,21,21,22,21,21,22,22,21,11,21,21,21,21,21],
    [21,21,21,21,21,21,21,21,21,21,21,21,21,21,11,21],
    [21,21,21,21,21,30,21,21,21,21,22,11,30,21,21,21],
    [21,21,21,30,21,21,21,21,21,21,21,21,21,21,21,21],
    [20,21,21,21,21,21,30,21,21,21,21,21,21,21,21,20],
    [20,20,21,21,21,30,21,21,21,21,21,21,21,21,20,20],
]

function returnMapBlockClass(mapNumber){
    const mapBlockClasses = {
        1: "player-one",
        2: "player-two",
        3: "player-three",
        4: "player-four",
        10: "map-grid-player-one-starting-position",
        11: "map-grid-player-two-starting-position",
        20: "map-grid-void",
        21: "map-grid-grass",
        22: "map-grid-sand",
        30: "map-grid-stone",
        70: "npc-zombie"
    }
    
    return mapBlockClasses[mapNumber]
}

// 0-29 actively taken away (like movement and spell highlight)
// 30+ stays (like glyphs)
function returnHighlightBlockClass(mapNumber){
    const mapHighlightClasses = {
        0: "",
        1: "active-movement-highlight",
        2: "inactive-movement-highlight",
        3: "spell-range-highlight"
    }
    
    return mapHighlightClasses[mapNumber]
}

const allMaps = [mapOne]