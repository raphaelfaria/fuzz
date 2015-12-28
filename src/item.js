class Item {
  constructor(name, index) {
    this.name = name;
    this.mainIndex = index;
    this.weight = 0;
    this.nameArray = this.name.split('');
    this.detailedArray = this._prepareItem();
  }

  _prepareItem() {
    function indexIsSectionStart(string, index) {
      return index === 0 ||
        (string[index].toUpperCase() === string[index] &&
          (index === 1 ||
            string[index - 1].toUpperCase() !== string[index - 1]));
    }

    return this.nameArray.map((char, index) => {
      return {
        index,
        char,
        beginSection: indexIsSectionStart(this.nameArray, index),
        weight: 0
      };
    });
  }

  calcMatch(string) {
    var matchIndex = [];
    var searchIndex = -1;
    var lookUpper = true;
    var testName = this.name;
    var lowerTestName = this.name.toLowerCase();

    for (var i = 0; i < string.length; i++) {
      var currentChar = string.charAt(i);

      if (lookUpper) {
        testName = this.name;
        currentChar = currentChar.toUpperCase();
      }

      if (!lookUpper) {
        testName = lowerTestName;
      }

      if (searchIndex >= this.name.length) {
        return false;
      }

      searchIndex = testName.indexOf(currentChar, searchIndex + 1);

      if (searchIndex > -1) {
        matchIndex.push(searchIndex);
      } else {
        if (lookUpper === false) {
          matchIndex = [];
          break;
        }

        if (lookUpper === true) {
          i -= 1;
          searchIndex = matchIndex[matchIndex.length - 1] || -1;
        }

        lookUpper = !lookUpper;
      }
    }

    this.matched = matchIndex;

    // Calculate rank
    this.calculateWeight();

    return !!(this.matched.length);
  }

  calculateWeight() {
    let substringSize = 0;

    this.weight = this.matched.reduce((weight, matchIndex, index) => {
      if (this.detailedArray[matchIndex].beginSection === true) {
        this.detailedArray[matchIndex].weight = (80 - matchIndex);
        weight += this.detailedArray[matchIndex].weight;

        if (this.matched[index - 1] == matchIndex - 1) {
          substringSize++;
          this.detailedArray[matchIndex].weight += 15 * Math.pow(2, substringSize) - matchIndex;
          weight += this.detailedArray[matchIndex].weight;
        }
      } else if (this.matched[index - 1] == matchIndex - 1) {
        substringSize++;
        this.detailedArray[matchIndex].weight = 15 * Math.pow(2, substringSize) - matchIndex;
        weight += this.detailedArray[matchIndex].weight;
      } else {
        this.detailedArray[matchIndex].weight = 10 - matchIndex;
        weight += this.detailedArray[matchIndex].weight;
      }

      weight -= ((this.name.length - 1) - this.matched[this.matched.length - 1]);

      return weight;

    }, 0);

    return this;
  }
}

export default Item;
