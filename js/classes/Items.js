class Items {
  constructor() {
    this.items = [itemWeaponsList.dirk];
  }

  _addNewItem = (item) => {};

  _removeItem = (item) => {};

  _dropItem = (item) => {};

  _buyItem = (item) => {};

  _updateItemStatsToCharacter = () => {
    this.items.forEach((item) => {
      item.stats.forEach((stat) => {
        const { keySequence, value } = stat;

        let statToChange;
        keySequence.forEach((key, index) => {
          if (index !== keySequence.length - 1) {
            statToChange = statToChange ? statToChange[key] : this[key];
          }
        });

        statToChange[keySequence[keySequence.length - 1]] += value;
      });
    });
  };
}
