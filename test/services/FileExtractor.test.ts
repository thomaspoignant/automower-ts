import FileExtractor from '../../src/services/FileExtractor';
import InvalidInputFile from '../../src/errors/InvalidInputFile';
import Orientation from '../../src/models/Orientation';

test('should not extract file with garden limit in string', () => {
  const filePath = './test/resources/input_invalid_limit';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('Impossible to configure garden with non numeric elements');
});

test('should not extract file with missing garden limit', () => {
  const filePath = './test/resources/input_invalid_no_maxY';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('Incorrect number of elements to configure the garden');
});

test('should not extract file with wrong orientation.', () => {
  const filePath = './test/resources/input_invalid_mower_move_2_letter';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('NO is not an authorized orientation (N,E,W,S)');
});

test('should not extract file with invalid mower position.', () => {
  const filePath = './test/resources/input_invalid_mower_letter_position';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('Impossible to configure auto mower with non numeric elements');
});

test('should not extract file with mower missing movement.', () => {
  const filePath = './test/resources/input_invalid_mower_missing_movement';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('The format of the input file is not correct, reason: Missing movement line');
});

test('should not extract file with mower missing orientation.', () => {
  const filePath = './test/resources/input_invalid_config_mower';
  expect(() => FileExtractor(filePath)).toThrow(InvalidInputFile);
  expect(() => FileExtractor(filePath)).toThrow('Incorrect number of elements to configure the auto mower');
});


test('should extract file with valid config.', () => {
  const filePath = './test/resources/input_valid';
  const res = FileExtractor(filePath);
  expect(res.size).toBe(2);

  const values = Array.from(res.values());
  expect(values[0]).toStrictEqual(['L', 'F', 'L', 'F', 'L', 'F', 'L', 'F', 'F']);
  expect(values[1]).toStrictEqual(['F', 'F', 'R', 'F', 'F', 'R', 'F', 'R', 'R', 'F']);

  const keys = Array.from(res.keys());
  expect(keys[0].x).toBe(1);
  expect(keys[0].y).toBe(2);
  expect(keys[0].orientation).toBe(Orientation.N);
  expect(keys[0].garden && keys[0].garden.column).toBe(5);
  expect(keys[0].garden && keys[0].garden.row).toBe(5);

  expect(keys[1].x).toBe(3);
  expect(keys[1].y).toBe(3);
  expect(keys[1].orientation).toBe(Orientation.E);
  expect(keys[1].garden && keys[1].garden.column).toBe(5);
  expect(keys[1].garden && keys[1].garden.row).toBe(5);
});
