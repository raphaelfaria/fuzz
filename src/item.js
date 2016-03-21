class Item {
  constructor(name, index) {
    this.name = name;
    this.mainIndex = index;
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
      };
    });
  }

  calcMatch(string) {
    let matchIndexArr = [];
    let searchIndex = -1;
    let lookUpper = true;

    const l = string.length;
    const lowerTestName = this.name.toLowerCase();

    for (let i = 0; i < l; i++) {
      const currentChar = string.charAt(i);

      if (searchIndex >= this.name.length) return false;

      searchIndex = (lookUpper ? this.name : lowerTestName).indexOf(
        lookUpper ? currentChar.toUpperCase() : currentChar,
        searchIndex + 1
      );

      if (searchIndex > -1) {
        matchIndexArr.push(searchIndex);
        continue;
      }

      if (!lookUpper) {
        matchIndexArr = [];
        break;
      }

      i -= 1;
      searchIndex = matchIndexArr[matchIndexArr.length - 1] || -1;
      lookUpper = !lookUpper;
    }

    return !!matchIndexArr.length && this._calculateWeight(matchIndexArr);
  }

  _calculateWeight(matchIndexArr) {
    let substringSize = 0;

    return matchIndexArr.reduce((weight, matchIndex, index) => {
      let weightCalc = weight;
      let tempWeight = 0;

      if (this._detailedArray[matchIndex].beginSection === true) {
        tempWeight = (80 - matchIndex);
        weightCalc += tempWeight;

        if (matchIndexArr[index - 1] === matchIndex - 1) {
          substringSize++;
          tempWeight += 15 * Math.pow(2, substringSize) - matchIndex;
          weightCalc += tempWeight;
        }
      } else if (matchIndexArr[index - 1] === matchIndex - 1) {
        substringSize++;
        tempWeight = 15 * Math.pow(2, substringSize) - matchIndex;
        weightCalc += tempWeight;
      } else {
        tempWeight = 10 - matchIndex;
        weightCalc += tempWeight;
      }

      weightCalc -= ((this.name.length - 1) - matchIndexArr[matchIndexArr.length - 1]);

      return weightCalc;
    }, 0);
  }
}

export default Item;
