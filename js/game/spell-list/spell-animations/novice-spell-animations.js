const noviceSpellAnimations = {
    heal: (target, player) => {
        const eleObj = spellAnimationHelperAdd(target.position, "spell-animation-novice-heal")
        setTimeout(() => {
            spellAnimationHelperRemove(eleObj)
        }, 2000)
    },
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
    },
    throwStaff: (target, player) => {
        const eleObj = createAnimationEleAndTransition(target, player, "throw-staff")


        const playerAnimation = new Promise(resolve => {
            setTimeout(() => {
                eleObj.playerEle.classList.remove(`spell-animation-throw-staff-${eleObj.playerDir}`)
                resolve()
            }, 600) //Also change the time in css
        })
    
        const projectileAnimation = new Promise(resolve => {setTimeout(()=> {
                eleObj.newProjectileEle.style.opacity = "1"
                eleObj.newProjectileEle.style.left = eleObj.projectile.x*77 + "px"
                eleObj.newProjectileEle.style.top = eleObj.projectile.y*77 + "px"
                setTimeout(() => {
                    eleObj.blockEle.removeChild(eleObj.newProjectileEle)
                    resolve()
                }, eleObj.transitionTime*100)
            },500)
        })
    
        return Promise.all([playerAnimation, projectileAnimation])
    },
    conjureFrost: (target, player) => {
        const eleObj = createAnimationEleAndTransition(target, player, "conjure-frost")
        
        const playerAnimation = new Promise(resolve => {
            setTimeout(() => {
                eleObj.playerEle.classList.remove(`spell-animation-conjure-frost-${eleObj.playerDir}`)
                resolve()
            }, 600) //Also change the time in css
        })

        const projectileAnimation = new Promise(resolve => {
            setTimeout(()=> {
                eleObj.newProjectileEle.style.opacity = "1"
                eleObj.newProjectileEle.style.left = eleObj.projectile.x*77 + "px"
                eleObj.newProjectileEle.style.top = eleObj.projectile.y*77 + "px"
                setTimeout(() => {
                    eleObj.blockEle.removeChild(eleObj.newProjectileEle)
                    resolve()
                }, eleObj.transitionTime*100)
            },500)
        })

        return Promise.all([playerAnimation, projectileAnimation])
    },
    forceStaff: (target, player) => {
        const eleObj = createAnimationEleAndTransition(target, player, "force-staff")
        
        const playerAnimation = new Promise(resolve => {
            setTimeout(() => {
                eleObj.playerEle.classList.remove(`spell-animation-force-staff-${eleObj.playerDir}`)
                resolve()
            }, 600) //Also change the time in css
        })
  
        const projectileAnimation = new Promise (resolve => {
            setTimeout(()=> {
                eleObj.newProjectileEle.style.opacity = "1"
                eleObj.newProjectileEle.style.left = eleObj.projectile.x*77 + "px"
                eleObj.newProjectileEle.style.top = eleObj.projectile.y*77 + "px"
                setTimeout(() => {
                    eleObj.blockEle.removeChild(eleObj.newProjectileEle)
                    resolve()
                }, eleObj.transitionTime*100)
            },500)
        })

        return Promise.all([playerAnimation, projectileAnimation])
    },
}