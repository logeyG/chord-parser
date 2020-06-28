const parse = require('./public/index');

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');

  var mock = {};
  mock.children = [];
  mock.classList = new Set();

  spy.mockReturnValue(mock);
});

test('major', () => {
  expect(parse('d')).toStrictEqual(['d', 'f#', 'a']);
  expect(parse('c#')).toStrictEqual(['c#', 'f', 'g#']);
  expect(parse('cmaj')).toStrictEqual(['c', 'e', 'g']);
});


test('minor', () => {
  expect(parse('dm')).toStrictEqual(['d', 'f', 'a']);
  expect(parse('amin')).toStrictEqual(['a-1', 'c', 'e']);
  expect(parse('f#m')).toStrictEqual(['f#', 'a', 'c#2']);
});

test('sus', () => {
  expect(parse('csus')).toStrictEqual(['c', 'f', 'g']);
  expect(parse('c#sus')).toStrictEqual(['c#', 'f#', 'g#']);
});

test('sus2', () => {
  expect(parse('csus2')).toStrictEqual(['c', 'd', 'g']);
  expect(parse('c#sus2')).toStrictEqual(['c#', 'd#', 'g#']);
});

test('sus4', () => {
  expect(parse('csus4')).toStrictEqual(['c', 'f', 'g']);
  expect(parse('c#sus4')).toStrictEqual(['c#', 'f#', 'g#']);
});

test('aug', () => {
  expect(parse('caug')).toStrictEqual(['c', 'e', 'g#']);
  expect(parse('g#aug')).toStrictEqual(['g#-1', 'c', 'e']);
});

test('dim', () => {
  expect(parse('cdim')).toStrictEqual(['c', 'd#', 'f#']);
  expect(parse('g#dim')).toStrictEqual(['g#-1', 'b-1', 'd']);
});

test('6th', () => {
  expect(parse('c6')).toStrictEqual(['c', 'e', 'g', 'a']);
  expect(parse('cm6')).toStrictEqual(['c', 'd#', 'g', 'a']);
  expect(parse('cmaj6')).toStrictEqual(['c', 'e', 'g', 'a']);
});

test('7th', () => {
  expect(parse('c7')).toStrictEqual(['c', 'e', 'g', 'a#']);
  expect(parse('cm7')).toStrictEqual(['c', 'd#', 'g', 'a#']);
  expect(parse('cmaj7')).toStrictEqual(['c', 'e', 'g', 'b']);
  expect(parse('cdim7')).toStrictEqual(['c', 'd#', 'f#', 'a']);
  expect(parse('caug7')).toStrictEqual(['c', 'e', 'g#', 'a#']);
});

test('9th', () => {
  expect(parse('c9')).toStrictEqual(['c', 'e', 'g', 'a#', 'd2']);
  expect(parse('cm9')).toStrictEqual(['c', 'd#', 'g', 'a#', 'd2']);
  expect(parse('cmaj9')).toStrictEqual(['c', 'e', 'g', 'b', 'd2']);
});

test('11th', () => {
  expect(parse('c11')).toStrictEqual(['c', 'e', 'g', 'a#', 'd2', 'f2']);
  expect(parse('cm11')).toStrictEqual(['c', 'd#', 'g', 'a#', 'd2', 'f2']);
  expect(parse('cmaj11')).toStrictEqual(['c', 'e', 'g', 'b', 'd2', 'f2']);
});

test('13th', () => {
  expect(parse('c13')).toStrictEqual(['c', 'e', 'g', 'a#', 'd2', 'a2']);
  expect(parse('cm13')).toStrictEqual(['c', 'd#', 'g', 'a#', 'd2', 'a2']);
  expect(parse('cmaj13')).toStrictEqual(['c', 'e', 'g', 'b', 'd2', 'a2']);
});