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
  expect(parse('g#aug')).toStrictEqual(['g#', 'c2', 'e2']);
});

test('dim', () => {
  expect(parse('cdim')).toStrictEqual(['c', 'd#', 'f#']);
  expect(parse('g#dim')).toStrictEqual(['g#', 'b', 'd2']);
});