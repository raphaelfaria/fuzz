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
        index, char,
        beginSection: indexIsSectionStart(this.nameArray, index),
        weight: 0
      }
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

        if (!lookUpper) testName = lowerTestName;

        if (searchIndex >= this.name.length) return false;

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
                searchIndex = matchIndex[matchIndex.length -1] || -1;
            }

            lookUpper = !lookUpper;
        }
    }

    this.matched = matchIndex.length ? matchIndex : false;

    // Calculate rank
    this.calculateWeight();

    return !!(this.matched.length);
  }

  calculateWeight() {
    let l = this.matched.length;
    let index;
    let substringSize = 0;

    for (let i = 0; i < l; i++) {
        index = this.matched[i];

        if (this.set[index].beginSection === true) {
            this.detailedArray[index].weight = (80 - index);
            this.weight += this.detailedArray[index].weight;

            if (this.matched[index - 1] == index - 1) {
                substringSize++;
                this.detailedArray[index].weight += 15 * Math.pow(2, substringSize) - index;
                this.weight += this.detailedArray[index].weight;
            }
        } else if (this.matched[index - 1] == index - 1) {
            substringSize++;
            this.detailedArray[index].weight = 15 * Math.pow(2, substringSize) - index;
            this.weight += this.detailedArray[index].weight;
        } else {
            this.detailedArray[index].weight = 10 - index;
            this.weight += this.detailedArray[index].weight;
        }

        this.weight -= ((this.length - 1) - this.matched[this.matched.length - 1]);
    }

    return this;
  }
}

class Fuzz extends Array {
  constructor(collection, options = {}) {
    super();
    this.main = collection;
    this.push.apply(this, this._prepareCollection());
  }

  parse(item) {
    return item;
  }

  _prepareCollection() {
    return this.main.map((item, i) => {
      return new Item(this.parse(item), i);
    });
  }

  match(string) {
    let query = string.replace(/\s+/g, '').toLowerCase();
    let results = this.filter(item => item.calcMatch(query));
    return results.sort((a, b) => {
      if (a.weight > b.weight)
        return -1;
      if (a.weight < b.weight)
        return 1;
      return 0;
    });
  }
}

export default Fuzz;
