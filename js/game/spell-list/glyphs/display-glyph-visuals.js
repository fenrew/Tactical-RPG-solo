const displayGlyphs = () => {
    for(let y = 0; y < Game.glyphMap.length; y++){
        for(let x = 0; x < Game.glyphMap[y].length; x++){
            Game.glyphMap[y][x].forEach((ele) => {
                const newGlyphEle = document.createElement("div")
                const relativeContainer = document.createElement("div")
                
                newGlyphEle.classList.add(`glyph-block-${ele.spell.spellInfo.glyphNumber}`)
                relativeContainer.classList.add("glyph-block-relative-container")

                relativeContainer.appendChild(newGlyphEle)
                const blockEle = document.getElementById(`map-grid-block-${y},${x}`)
                blockEle.insertBefore(relativeContainer, blockEle.childNodes[0])
            })
        }
    }
}