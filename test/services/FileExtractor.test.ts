import FileExtractor from '../../src/services/FileExtractor';
import InvalidInputFile from '../../src/errors/InvalidInputFile';

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
});
