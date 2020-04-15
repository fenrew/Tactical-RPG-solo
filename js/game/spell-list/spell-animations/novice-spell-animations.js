const noviceSpellAnimations = {
    inspire: (target,player) => {
        const eleObj = spellAnimationHelperAdd(target.position, "spell-animation-inspire")
        setTimeout(() => {
            spellAnimationHelperRemove(eleObj)
        }, 1500)
    },
    defensiveStance: (target, player) => {
        const eleObj = spellAnimationHelperAdd(target.position, "spell-animation-defensive-stance")
        setTimeout(() => {
            spellAnimationHelperRemove(eleObj)
        }, 2000)
    }
}