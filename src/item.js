class Item {
  constructor(name, index) {
    this.name = name;
    this.mainIndex = index;
    this.weight = 0;
    this._detailedArray = this._prepareItem();
  }

  _prepareItem() {
    function indexIsSectionStart(string, index) {
      return index === 0 ||
        (string[index].toUpperCase() === string[index] &&
          (index === 1 ||
            string[index - 1].toUpperCase() !== string[index - 1]));
    }

    return this.name.split('').map((char, index, arr) => {
      return {
        index,
        char,
        beginSection: indexIsSectionStart(arr, index),
        weight: 0
      };
    });
  }

  calcMatch(string) {
    let matchIndex = [];
    let searchIndex = -1;
    let lookUpper = true;
    let testName = this.name;

    const l = string.length;
    const lowerTestName = this.name.toLowerCase();

    for (let i = 0; i < l; i++) {
      let currentChar = string.charAt(i);

      if (searchIndex >= this.name.length) {
        return false;
      }

      searchIndex = (lookUpper ? this.name : lowerTestName).indexOf(
        lookUpper ? currentChar.toUpperCase() : currentChar,
        searchIndex + 1
      );

      if (searchIndex > -1) {
        matchIndex.push(searchIndex);
        continue;
      }

      if (!lookUpper) {
        matchIndex = [];
        break;
      }

      i -= 1;
      searchIndex = matchIndex[matchIndex.length - 1] || -1;
      lookUpper = !lookUpper;
    }

    this._matched = matchIndex;

    // Calculate rank
    this.calculateWeight();

    return !!(this._matched.length);
  }

  calculateWeight() {
    let substringSize = 0;

    this.weight = this._matched.reduce((weight, matchIndex, index) => {
      if (this._detailedArray[matchIndex].beginSection === true) {
        this._detailedArray[matchIndex].weight = (80 - matchIndex);
        weight += this._detailedArray[matchIndex].weight;

        if (this._matched[index - 1] == matchIndex - 1) {
          substringSize++;
          this._detailedArray[matchIndex].weight += 15 * Math.pow(2, substringSize) - matchIndex;
          weight += this._detailedArray[matchIndex].weight;
        }
      } else if (this._matched[index - 1] == matchIndex - 1) {
        substringSize++;
        this._detailedArray[matchIndex].weight = 15 * Math.pow(2, substringSize) - matchIndex;
        weight += this._detailedArray[matchIndex].weight;
      } else {
        this._detailedArray[matchIndex].weight = 10 - matchIndex;
        weight += this._detailedArray[matchIndex].weight;
      }

      weight -= ((this.name.length - 1) - this._matched[this._matched.length - 1]);

      return weight;

    }, 0);

    return this;
  }
}

export default Item;
