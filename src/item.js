function isUpper(char) {
  return char.toUpperCase() === char;
}

function nonWordChar(char) {
  return /\W/.test(char);
}

function indexIsSectionStart(string, index) {
  return index === 0 ||
    (index === 1 && isUpper(string[index])) ||
    isUpper(string[index]) || nonWordChar(string[index - 1]);
}

function calculateWeight(name, substringSize, matchIndex, lastMatchIndex) {
  const isSectionStart = indexIsSectionStart(name, matchIndex);

  let weight = 0;

  if (isSectionStart) {
    weight += 85;
  }

  if (substringSize > 1) {
    weight += (50 + (14 * (substringSize - 1)));
  }

  if (lastMatchIndex >= 0 && matchIndex - lastMatchIndex > 0) {
    weight -= (matchIndex - lastMatchIndex);
  }

  return weight;
}

function countSections(name) {
  let count = 0;

  const l = name.length;

  for (let i = 0; i < l; i++) {
    if (indexIsSectionStart(name, i)) {
      count++;
    }
  }

  return count;
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
    let substringSize = 1;

    const l = string.length;
    const lowerTestName = this.name.toLowerCase();

    for (let i = 0; i < l; i++) {
      const currentChar = string.charAt(i);

      if (searchIndex >= this.name.length) return false;

      if (lookUpper) {
        for (let j = searchIndex + 1; j < this.name.length; j++) {
          if (currentChar === this.name[j].toLowerCase() && indexIsSectionStart(this.name, j)) {
            searchIndex = j;
            break;
          }

          searchIndex = -1;
        }
      } else {
        searchIndex = lowerTestName.indexOf(currentChar, searchIndex + 1);
      }

      if (searchIndex > -1) {
        if (matchIndexArr[matchIndexArr.length - 1] === searchIndex - 1) {
          substringSize++;
        } else {
          substringSize = 1;
        }

        matchIndexArr.push(searchIndex);
        weight += calculateWeight(
          this.name,
          substringSize,
          searchIndex,
          matchIndexArr[matchIndexArr.length - 2]
        );

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

    if (!matchIndexArr.length) {
      return false;
    }

    const sectionCount = countSections(this.name);

    weight = weight - Math.round(matchIndexArr[0] * 1.2) - (sectionCount * l);

    return weight > 0 ? weight : 0;
  }
}

export default Item;
