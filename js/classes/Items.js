class Items {
  constructor() {
    this.items = [];
  }

  _addNewItem = (item) => {
    this.items.push(item);
    this._changeOneItemStat(item);
  };

  _removeItem = (item) => {
    this.items.splice(this.items.indexOf(item), 1);
    console.log(this.items);
    this._changeOneItemStat(item, true);
  };

  _dropItem = (item) => {};

  _buyItem = (item) => {
    console.log("Bought item", item);

    if (this.player.gold < item.price)
      return console.log(
        `You only have ${this.player.gold} but the item costs ${item.price}`
      );

    this.player.gold -= item.price;
    this.items.push(item);
    this._changeOneItemStat(item);
  };

  _changeOneItemStat = (item, remove) => {
    item.stats.forEach((stat) => {
      let { keySequence, value } = stat;
      keySequence = getKeySequence(keySequence);

      let statToChange;
      keySequence.forEach((key, index) => {
        if (index !== keySequence.length - 1) {
          statToChange = statToChange ? statToChange[key] : this[key];
        }
      });

      if (!remove) statToChange[keySequence[keySequence.length - 1]] += value;
      else statToChange[keySequence[keySequence.length - 1]] -= value;
    });

    updateCurrentManaBar(this.player);
    updateCurrentHealthBar(this.player);
  };

  _changeAllItemStats = () => {
    this.items.forEach((item) => {
      this._changeOneItemStat(item);
    });
  };
}
