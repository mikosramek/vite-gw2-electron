import lunr from 'lunr';

// import _get from 'lodash.get';

class GW2ItemLibrary {
  constructor() {
    this.items = import('../data/newItemMap.json');
    this.library = lunr(function() {
        this.field('id');
        this.field('name');
        for (const [, value] of Object.entries(itemMap)) {
          this.add(value);
        }
      }
    );
  }
  search (query) {
    if (!this.library) return new Error('No item library found.');
    const results = this.library.search(query).slice(0, 10);
    const parsedResults = [];
    if (results.length > 0) {
      results.forEach(({ ref }) => {
        if (this.items[ref]) {
          const { name, id } = this.items[ref];
          parsedResults.push({ name, id });
        }
      });
    }
    return parsedResults;
  }
  findOne (query) {
    try {
      const results = this.search(query.join(' '));
      if (results.length > 0) {
        const reference = results[0];
        const { ref : refId } = reference;
        return this.items[refId];
      }
      else return new Error('No item found.');
    }
    catch (error) {
      console.error('GW2ItemLibrary.js@findOne:', error.message);
      return error;
    }
  }

  convertCopperToGold(amount) {
    const gold = amount - (amount % 10000);
    amount -= gold;
    const silver = amount - (amount % 100);
    amount -= silver;
    const copper = amount;
    const finalGold = gold / 10000;
    const finalSilver = silver / 100;
    return `${finalGold} <gold> ${finalSilver > 9 ? finalSilver : `0${finalSilver}`} <silver> ${copper > 9 ? copper : `0${copper}`} <copper>`;
  }
}

export default GW2ItemLibrary;
