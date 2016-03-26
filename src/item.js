function isUpper(char) {
  return char.toUpperCase() === char;
}

function nonWordChar(char) {
  return /\W/.test(char);
}

function indexIsSectionStart(string, index) {
  return index >= 0 &&
    index === 0 ||
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

// function countSections(name) {
//   let count = 0;

//   const l = name.length;

//   for (let i = 0; i < l; i++) {
//     if (indexIsSectionStart(name, i)) {
//       count++;
//     }
//   }

//   return count;
// }

class Item {
  constructor(name, index) {
    this.name = name;
    this.mainIndex = index;
  }

  calcMatch(query) {
    if (query.length > this.name.length) {
      return false;
    }

    const matchIndexArr = [];
    const ql = query.length;
    const nl = this.name.length;
    const lowerTestName = this.name.toLowerCase();

    let searchIndex = 0;

    for (let i = 0; i < ql; i++) {
      const currentChar = query[i];

      if (searchIndex >= nl) return false;

      searchIndex = lowerTestName.indexOf(currentChar, searchIndex);

      if (searchIndex === -1) {
        return false;
      }

      matchIndexArr.push(searchIndex++);
    }

    let substringSize = 1;

    let weight = matchIndexArr.reduce((w, matchIndex, index, arr) => {
      let tempWeight = w;

      if (arr[index] === matchIndex - 1) {
        substringSize++;
      } else {
        substringSize = 1;
      }

      tempWeight += calculateWeight(
        this.name,
        substringSize,
        matchIndex,
        arr[index - 1]
      );

      return tempWeight;
    }, 0);

    // const sectionCount = countSections(this.name);

    const lastIndexDiff = nl - matchIndexArr[matchIndexArr.length - 1] - 1;

    // weight = weight - Math.round(matchIndexArr[0] * 1.2) - (sectionCount * nl);
    weight = weight - Math.round(matchIndexArr[0] * 1.2) - lastIndexDiff;

    return weight > 0 ? weight : 0;
  }
}

export default Item;
