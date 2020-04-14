//Adding the movement highlight div and on click to the map
function displayMapHighlightsVisuals(){
    let highlightMap = Game.mapHighlights
    removeHighlightsFromMap(true)
    for(let y = 0; y < highlightMap.length; y++){
        for(let x = 0; x < highlightMap[y].length; x++){
            if(highlightMap[y][x].length > 0){
                let mapGridBlockDiv = document.getElementById("map-grid-block-"+y+","+x)
                let highlightDiv = document.createElement("div")
                highlightMap[y][x].forEach((mapNumber) => {
                    highlightDiv.classList.add(returnHighlightBlockClass(mapNumber))
                })
                
                // This if statement is to add on click to movement highlights and spell highlight
                if(highlightMap[y][x].indexOf(1)>-1) {
                    addOnClickMovementHighlight(highlightDiv, {y, x})
                } else if(highlightMap[y][x].indexOf(3) > -1){
                    addOnClickToCastSpellOnHighlight(highlightDiv, {y, x})
                }
                
                // highlightDiv.style.top = y * 77 + "px"
                // highlightDiv.style.left = x * 77 + "px"
                

                mapGridBlockDiv.appendChild(highlightDiv)
            }
        }
    }
}

// Removes ALL highlights from the map
const removeHighlightsFromMap = (dontUpdateHighlightMap) =>{
    let highlightMap = Game.mapHighlights

    for(let y = 0; y < highlightMap.length; y++){
        for(let x = 0; x < highlightMap[y].length; x++){
            for(let i = 0; i < highlightMap[y][x].length; i++){
                if(highlightMap[y][x][i] > 0 && highlightMap[y][x][i] < 30){
                    let mapGridBlockDiv = document.getElementById("map-grid-block-"+y+","+x)
                    let highlightDiv = mapGridBlockDiv.getElementsByClassName(returnHighlightBlockClass(highlightMap[y][x][i]))[0]
                    if(highlightDiv){
                        highlightDiv.parentNode.removeChild(highlightDiv)
                    }
                    if(!dontUpdateHighlightMap){
                        highlightMap[y][x].splice(highlightMap[y][x].indexOf(i), 1)
                    }
                }
            }
        }
    }
}


//Removes the movement highlights from the map
function removeMovementHighlightsFromMap(){
    let highlightMap = Game.mapHighlights

    for(let y = 0; y < highlightMap.length; y++){
        for(let x = 0; x < highlightMap[y].length; x++){
            let removedHighlight = ""
            if(highlightMap[y][x].indexOf(1) > -1){
                highlightMap[y][x].splice(highlightMap[y][x].indexOf(1), 1)
                removedHighlight = 1
            } else if(highlightMap[y][x].indexOf(2) > -1){
                highlightMap[y][x].splice(highlightMap[y][x].indexOf(2), 1)
                removedHighlight = 2
            }

            if(removedHighlight){
                let mapGridBlockDiv = document.getElementById("map-grid-block-"+y+","+x)
                let highlightDiv = mapGridBlockDiv.getElementsByClassName(returnHighlightBlockClass(removedHighlight))[0]
                highlightDiv.parentNode.removeChild(highlightDiv)
            }
        }
    }

    return highlightMap
}