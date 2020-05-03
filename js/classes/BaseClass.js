class BaseClass {

    async _addTargetSpellConditions(spell, position) {
        if (checkIfSpellIsCastable(this, spell)) return console.log("Cant be cast");
        let target = Game._getUnitByPosition(position);
        if (!target && !spell.spellInfo.castOnNoTarget)
          return console.log("No target");
    
        this.combatstats.currentMana -= spell.spellInfo.manaCost;
        updateCurrentManaBar(this.player);
    
        
        const onAttackAnswers = {cancelSpell: false}
        this.conditions.onAttack.forEach((ele) => {
          let answerOnAttack = ele.spell.conditionEffect(this.player, spell, ele, target);
          if(answerOnAttack) {
            for (let key in answerOnAttack){
              onAttackAnswers[key] = answerOnAttack[key]
            }
          }
        });
        if(onAttackAnswers.cancelSpell) return
    
        const onDefenseAnswers = {cancelSpell: false}
        target.class.conditions.onDefense.forEach((ele) => {
          let answerOnDefense = ele.spell.conditionEffect(this.player, spell, ele, target);
          if(answerOnDefense) {
            for (let key in answerOnDefense){
              onDefenseAnswers[key] = answerOnDefense[key]
            }
          }
        });
       // if(onAttackAnswers.cancelSpell) return
    
        spell.castCounter += 1;
        this.castCounter[spell.category] += 1;
        this._checkIfNewSpellIsLearned(spell);
    
        let modifiedDamage = await spell.castEffect(
          target ? target : position,
          spell,
          this
        );
    
        if (noviceSpellAnimations[spell.id])
          await noviceSpellAnimations[spell.id](target, this.player);
    
        if (target?.newPosition) {
          target.position = { ...target.newPosition };
          target.newPosition = false;
        }
    
        if (modifiedDamage) {
          handleSpellDamageEffectAnimation(
            target,
            modifiedDamage,
            spell.spellInfo.type
          );
        }
    
        Game._checkIfAnyoneHasDied();
    
        this._checkIfPromotionToNewClass();
      }
}