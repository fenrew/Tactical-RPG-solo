function calculatePhysicalMeleeDamageModifiers(caster, target){
    let casterMod = caster.damageModifiers.offensive
    let targetMod = target.class.damageModifiers.defensive

    let meleeDamageModifier = ((
        casterMod.allDamage+
        casterMod.physicalDamage.allDamage+
        casterMod.physicalDamage.meleeDamage)-2) * 
        ((targetMod.allDamage+
            targetMod.physicalDamage.allDamage+
            targetMod.physicalDamage.meleeDamage)-2)

    if(casterMod.allDamage <= 0 || casterMod.physicalDamage <= 0 || casterMod.physicalDamage.meleeDamage <= 0
        || targetMod.allDamage <= 0 || targetMod.physicalDamage <= 0 || targetMod.physicalDamage.meleeDamage <= 0){
        meleeDamageModifier = 0
    }
    return meleeDamageModifier
}

function calculatePhysicalRangedDamageModifiers(caster, target){
    let casterMod = caster.damageModifiers.offensive
    let targetMod = target.class.damageModifiers.defensive

    let rangedDamageModifier = ((
        casterMod.allDamage+
        casterMod.physicalDamage.allDamage+
        casterMod.physicalDamage.rangedDamage)-2) * 
        ((targetMod.allDamage+
            targetMod.physicalDamage.allDamage+
            targetMod.physicalDamage.rangedDamage)-2)
    
    if(casterMod.allDamage <= 0 || casterMod.physicalDamage <= 0 || casterMod.physicalDamage.rangedDamage <= 0
        || targetMod.allDamage <= 0 || targetMod.physicalDamage <= 0 || targetMod.physicalDamage.rangedDamage <= 0){
        rangedDamageModifier = 0
    }
    return rangedDamageModifier
}

const calculateMagicalDamageModifiers = (caster, target, element) => {
    let casterMod = caster.damageModifiers.offensive
    let targetMod = target.class.damageModifiers.defensive

    let magicalOffenseDamageModifier = ((
        casterMod.allDamage+
        casterMod.magicalDamage.allDamage+
        casterMod.magicalDamage.elementalMagic[element]
    )-2)

    let magicalDefenseDamageModifier = ((
        targetMod.allDamage+
        targetMod.magicalDamage.allDamage+
        targetMod.magicalDamage.elementalMagic[element]
    )-2)

    if(casterMod.allDamage <= 0 || casterMod.magicalDamage.allDamage <= 0
        || targetMod.allDamage <= 0 || targetMod.magicalDamage.allDamage <= 0 ||
        casterMod.magicalDamage.elementalMagic[element] <= 0 ||
        targetMod.magicalDamage.elementalMagic[element] <= 0){
        return 0
    }

    console.log(casterMod.allDamage, casterMod.magicalDamage.allDamage, casterMod.magicalDamage.elementalMagic[element])

    return magicalOffenseDamageModifier * magicalDefenseDamageModifier
}

function calculateHealingModifiers(caster, target){
    let casterMod = caster.damageModifiers.healing
    let targetMod = target.class.damageModifiers.healing

    let healingModifier = casterMod.casterModifier + targetMod.recieved - 1
    return healingModifier
}