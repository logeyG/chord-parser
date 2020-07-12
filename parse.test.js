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
  expect(parse('D')).toStrictEqual(['D', 'F#', 'A']);
  expect(parse('C#')).toStrictEqual(['C#', 'F', 'G#']);
  expect(parse('Cmaj')).toStrictEqual(['C', 'E', 'G']);
});


test('minor', () => {
  expect(parse('Dm')).toStrictEqual(['D', 'F', 'A']);
  expect(parse('Amin')).toStrictEqual(['A-1', 'C', 'E']);
  expect(parse('F#m')).toStrictEqual(['F#', 'A', 'C#2']);
});

test('sus', () => {
  expect(parse('Csus')).toStrictEqual(['C', 'F', 'G']);
  expect(parse('C#sus')).toStrictEqual(['C#', 'F#', 'G#']);
});

test('sus2', () => {
  expect(parse('Csus2')).toStrictEqual(['C', 'D', 'G']);
  expect(parse('C#sus2')).toStrictEqual(['C#', 'D#', 'G#']);
});

test('sus4', () => {
  expect(parse('Csus4')).toStrictEqual(['C', 'F', 'G']);
  expect(parse('C#sus4')).toStrictEqual(['C#', 'F#', 'G#']);
});

test('aug', () => {
  expect(parse('Caug')).toStrictEqual(['C', 'E', 'G#']);
  expect(parse('G#aug')).toStrictEqual(['G#-1', 'C', 'E']);
});

test('dim', () => {
  expect(parse('Cdim')).toStrictEqual(['C', 'D#', 'F#']);
  expect(parse('G#dim')).toStrictEqual(['G#-1', 'B-1', 'D']);
});

test('6th', () => {
  expect(parse('C6')).toStrictEqual(['C', 'E', 'G', 'A']);
  expect(parse('Cm6')).toStrictEqual(['C', 'D#', 'G', 'A']);
  expect(parse('Cmaj6')).toStrictEqual(['C', 'E', 'G', 'A']);
});

test('7th', () => {
  expect(parse('C7')).toStrictEqual(['C', 'E', 'G', 'A#']);
  expect(parse('Cm7')).toStrictEqual(['C', 'D#', 'G', 'A#']);
  expect(parse('Cmaj7')).toStrictEqual(['C', 'E', 'G', 'B']);
  expect(parse('Cdim7')).toStrictEqual(['C', 'D#', 'F#', 'A']);
  expect(parse('Caug7')).toStrictEqual(['C', 'E', 'G#', 'A#']);
});

test('9th', () => {
  expect(parse('C9')).toStrictEqual(['C', 'E', 'G', 'A#', 'D2']);
  expect(parse('Cm9')).toStrictEqual(['C', 'D#', 'G', 'A#', 'D2']);
  expect(parse('Cmaj9')).toStrictEqual(['C', 'E', 'G', 'B', 'D2']);
});

test('11th', () => {
  expect(parse('C11')).toStrictEqual(['C', 'E', 'G', 'A#', 'D2', 'F2']);
  expect(parse('Cm11')).toStrictEqual(['C', 'D#', 'G', 'A#', 'D2', 'F2']);
  expect(parse('Cmaj11')).toStrictEqual(['C', 'E', 'G', 'B', 'D2', 'F2']);
});

test('13th', () => {
  expect(parse('C13')).toStrictEqual(['C', 'E', 'G', 'A#', 'D2', 'A2']);
  expect(parse('Cm13')).toStrictEqual(['C', 'D#', 'G', 'A#', 'D2', 'A2']);
  expect(parse('Cmaj13')).toStrictEqual(['C', 'E', 'G', 'B', 'D2', 'A2']);
});

test('flats', () => {
  expect(parse('Bb13')).toStrictEqual(['A#-1', 'D', 'F', 'G#', 'C2', 'G2']);
});