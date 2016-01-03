# Fuzz

Study of a simple fuzzy string matcher, inspired by TextMate, Atom and Sublime searching

## Usage

Create a new instance of Fuzz by passing an array of strings

```javascript
var fuzz = new Fuzz(['String', 'str', 'match']);
```

To make a search use the `match` method. The results are ordered by it's relevance according to the matching string.

```javascript
fuzz.match('str');
// ["str", "String"]
```

The result will have a `meta` array with detailed info about the
search results. Each `Item` will have a `name`, `mainIndex` which is the index of the result on the main collection, and `weight`.

```javascript
// Getting the first result, for example
fuzz.match('str').meta[0];
// Item {name: "str", mainIndex: 1, weight: 167}
```
