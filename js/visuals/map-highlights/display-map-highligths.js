//Adding the movement highlight div and on click to the map
function displayMapHighlightsVisuals(highlightMap){
    console.log("displayMapHighlights", highlightMap)
    for(let y = 0; y < highlightMap.length; y++){
        for(let x = 0; x < highlightMap[y].length; x++){
            let mapGridBlockDiv = document.getElementById("map-grid-block-"+y+","+x)
            if(highlightMap[y][x].length > 0){
                let highlightDiv = document.createElement("div")
                highlightMap[y][x].forEach((mapNumber) => {
                    highlightDiv.classList.add(returnHighlightBlockClass(mapNumber))
                })
                if(highlightMap[y][x].indexOf(1)>-1) {
                    addOnClickMovementHighlight(highlightDiv, positions = {y, x})
                }
                mapGridBlockDiv.appendChild(highlightDiv)
            }
        }
    }
}


//Removes the movement highlights from the map
function removeMovementHighlightsFromMap(highlightMap){
    
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