import AutoMower from '../../src/models/AutoMower';
import Orientation from '../../src/models/Orientation';
import Garden from '../../src/models/Garden';
import { Movement } from '../../src/models/Movement';
import NoGardenError from '../../src/errors/NoGardenError';

test('should turn left', () => {
  const autoMower = new AutoMower(5, 5, Orientation.N);
  autoMower.garden = new Garden(10, 10);
  expect(autoMower.orientation).toBe(Orientation.N);
  autoMower.drive(['L']);
  expect(autoMower.orientation).toBe(Orientation.W);
});

test('should turn right', () => {
  const autoMower = new AutoMower(5, 5, Orientation.N);
  autoMower.garden = new Garden(10, 10);
  expect(autoMower.orientation).toBe(Orientation.N);
  autoMower.drive(['R']);
  expect(autoMower.orientation).toBe(Orientation.E);
});

test('should move to north inside garden', () => {
  const autoMower = new AutoMower(5, 5, Orientation.N);
  autoMower.garden = new Garden(10, 10);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(6);
});

test('should move to south inside garden', () => {
  const autoMower = new AutoMower(5, 5, Orientation.S);
  autoMower.garden = new Garden(10, 10);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(4);
});

test('should move to east inside garden', () => {
  const autoMower = new AutoMower(5, 5, Orientation.E);
  autoMower.garden = new Garden(10, 10);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(6);
  expect(autoMower.y).toBe(5);
});

test('should move to west inside garden', () => {
  const autoMower = new AutoMower(5, 5, Orientation.W);
  autoMower.garden = new Garden(10, 10);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(4);
  expect(autoMower.y).toBe(5);
});

test('should move to east and touch border', () => {
  const autoMower = new AutoMower(5, 5, Orientation.E);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(5);
});

test('should move to west and touch border', () => {
  const autoMower = new AutoMower(0, 5, Orientation.W);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(0);
  expect(autoMower.y).toBe(5);
});

test('should move to south and touch border', () => {
  const autoMower = new AutoMower(5, 0, Orientation.S);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(0);
});

test('should move to north and touch border', () => {
  const autoMower = new AutoMower(5, 5, Orientation.N);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(['F']);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(5);
});

test('should be equals to the first example test', () => {
  const driveExecution = 'LFLFLFLFF';
  const autoMower = new AutoMower(1, 2, Orientation.N);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(driveExecution.split('') as Array<Movement>);
  expect(autoMower.x).toBe(1);
  expect(autoMower.y).toBe(3);
  expect(autoMower.orientation).toBe(Orientation.N);
});

test('should be equals to the second example test', () => {
  const driveExecution = 'FFRFFRFRRF';
  const autoMower = new AutoMower(3, 3, Orientation.E);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(driveExecution.split('') as Array<Movement>);
  expect(autoMower.x).toBe(5);
  expect(autoMower.y).toBe(1);
  expect(autoMower.orientation).toBe(Orientation.E);
});

test('should stay at the same place if no movement', () => {
  const driveExecution = '';
  const autoMower = new AutoMower(3, 3, Orientation.E);
  autoMower.garden = new Garden(5, 5);
  autoMower.drive(driveExecution.split('') as Array<Movement>);
  expect(autoMower.x).toBe(3);
  expect(autoMower.y).toBe(3);
  expect(autoMower.orientation).toBe(Orientation.E);
});

test('should move till the wall', () => {
  const driveExecution = 'FFFFFFFRFFFF';
  const autoMower = new AutoMower(0, 0, Orientation.N);
  autoMower.garden = new Garden(3, 3);
  autoMower.drive(driveExecution.split('') as Array<Movement>);
  expect(autoMower.x).toBe(3);
  expect(autoMower.y).toBe(3);
  expect(autoMower.orientation).toBe(Orientation.E);
});

test('should not drive if not in a garden', () => {
  const autoMower = new AutoMower(5, 5, Orientation.N);
  expect(() => autoMower.drive(['L'])).toThrow(NoGardenError);
});
