class BaseClass {
  async _addTargetSpellConditions(spell, position, castTimes = 1) {
    if (checkIfSpellIsCastable(this, spell, position))
      return console.log("Cant be cast");

    let target = Game._getUnitByPosition(position);
    if (!target && !spell.spellInfo.castOnNoTarget)
      return console.log("No target");

    this.combatstats.currentMana -= spell.spellInfo.manaCost;
    updateCurrentManaBar(this.player);

    if (noviceSpellAnimations[spell.id])
      await noviceSpellAnimations[spell.id](target, this.player);

    for (let i = 0; i < castTimes; i++) {
      let onAttackAnswer = this._onAttack(spell, target);
      if (!onAttackAnswer) return;

      let modifiedDamage = await spell.castEffect(
        target ? target : position,
        spell,
        this
      );

      let onDefenseAnswer = this._onDefense(spell, target);

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
    }

    Game._checkIfAnyoneHasDied();

    spell.castCounter += 1;
    this.castCounter[spell.category] += 1;
    this._checkIfNewSpellIsLearned(spell);

    this._checkIfPromotionToNewClass();
  }

  _onAttack(spell, target) {
    const onAttackAnswers = { cancelSpell: false };
    this.conditions.onAttack.forEach((ele) => {
      let answerOnAttack = ele.spell.conditionEffect(
        this.player,
        spell,
        ele,
        target
      );
      if (answerOnAttack) {
        for (let key in answerOnAttack) {
          onAttackAnswers[key] = answerOnAttack[key];
        }
      }
    });
    if (onAttackAnswers.cancelSpell) return false;

    return true;
  }

  _onDefense(spell, target) {
    if (!target) return;
    const onDefenseAnswers = {};
    target.class.conditions.onDefense.forEach((ele) => {
      let answerOnDefense = ele.spell.conditionEffect(
        this.player,
        spell,
        ele,
        target
      );
      if (answerOnDefense) {
        for (let key in answerOnDefense) {
          onDefenseAnswers[key] = answerOnDefense[key];
        }
      }
    });

    return true;
  }

  _checkIfNewSpellIsLearned() {
    for (let catKey in this.castCounter) {
      for (let spellKey in this.spells) {
        if (
          this.castCounter[catKey] === this.spells[spellKey].toLearn &&
          catKey === this.spells[spellKey].category &&
          !this.spells[spellKey].spellInfo.learned
        ) {
          this.spells[spellKey].spellInfo.learned = true;

          displayLearnedNewSpell(this.spells[spellKey]);
        }
      }
    }
  }
}
