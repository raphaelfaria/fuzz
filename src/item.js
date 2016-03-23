function indexIsSectionStart(string, index) {
  return index === 0 ||
    (string[index].toUpperCase() === string[index] &&
      (index === 1 ||
        string[index - 1].toUpperCase() !== string[index - 1]));
}

function calculateWeight(name, substringSize, matchIndex, matchIndexArr) {
  const isSectionStart = indexIsSectionStart(name, matchIndex);

  let tempWeight = 0;

  if (isSectionStart === true) {
    tempWeight = (80 - matchIndex);

    if (matchIndexArr[matchIndexArr.length - 1] === matchIndex - 1) {
      tempWeight += 15 * Math.pow(2, substringSize) - matchIndex;
    }
  } else if (matchIndexArr[matchIndexArr.length - 1] === matchIndex - 1) {
    tempWeight = 15 * Math.pow(2, substringSize) - matchIndex;
  } else {
    tempWeight = 10 - matchIndex;
  }

  tempWeight -= ((name.length - 1) - matchIndexArr[matchIndexArr.length - 1]);

  return tempWeight;
}

class Item {
  constructor(name, index) {
    this.name = name;
    this.mainIndex = index;
  }

  calcMatch(string) {
    let matchIndexArr = [];
    let searchIndex = -1;
    let lookUpper = true;
    let weight = 0;
    let substringSize = 0;

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
        if (matchIndexArr[matchIndexArr.length - 1] === searchIndex - 1) {
          substringSize++;
        }

        matchIndexArr.push(searchIndex);
        weight += calculateWeight(this.name, substringSize, searchIndex, matchIndexArr);

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

    return !!matchIndexArr.length && weight;
  }
}

export default Item;
