import fs from 'fs';
import _ from 'lodash';
import Garden from '../models/Garden';
import AutoMower from '../models/AutoMower';
import { Movement } from '../models/Movement';
import InvalidInputFile from '../errors/InvalidInputFile';
import Orientation from '../models/Orientation';

function isNumeric(item: string): boolean {
  return !Number.isNaN(Number(item));
}

function gardenFromFirstLine(line: string): Garden {
  const items = line.split(' ');

  if (items.length !== 2) {
    throw new InvalidInputFile('Incorrect number of elements to configure the garden');
  }

  if (!isNumeric(items[0]) || !isNumeric(items[1])) {
    throw new InvalidInputFile('Impossible to configure garden with non numeric elements');
  }

  return new Garden(Number(items[0]), Number(items[1]));
}

function autoMowerFromLine(line: string): AutoMower {
  const items = line.split(' ');

  if (items.length !== 3) {
    throw new InvalidInputFile('Incorrect number of elements to configure the auto mower');
  }

  if (!isNumeric(items[0]) || !isNumeric(items[1])) {
    throw new InvalidInputFile('Impossible to configure auto mower with non numeric elements');
  }

  const validOrientation = ['N', 'E', 'W', 'S'];
  if (!validOrientation.includes(items[2])) {
    throw new InvalidInputFile(`${items[2]} is not an authorized orientation (${validOrientation})`);
  }

  const orientation = items[2] as keyof typeof Orientation;
  return new AutoMower(Number(items[0]), Number(items[1]), Orientation[orientation]);
}

function movementsFromLine(line: string): Array<Movement> {
  const items = line.split('');
  const validMovement = ['R', 'L', 'F'];

  return items
    .filter((move) => validMovement.includes(move)).map((move) => move as Movement);
}

export default function extractFile(filePath: string): Map<AutoMower, Array<Movement>> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const lines = fileContents.split('\n').filter((line) => !_.isEmpty(line));

  const garden = gardenFromFirstLine(lines[0]);
  const autoMowers: Map<AutoMower, Array<Movement>> = new Map<AutoMower, Array<Movement>>();

  const otherLines: Array<string> = lines.slice(1);
  let iterator = 0;

  while (iterator < otherLines.length) {
    // Check that we have the 2 lines to configure the mower and his movements.
    if (iterator === otherLines.length - 1) {
      throw new InvalidInputFile('The format of the input file is not correct, reason: Missing movement line');
    }

    const autoMowerConfig = otherLines[iterator];
    const autoMower = autoMowerFromLine(autoMowerConfig);
    autoMower.garden = garden;

    const movementConfig = otherLines[iterator];
    const movements = movementsFromLine(movementConfig);
    autoMowers.set(autoMower, movements);
    iterator += 2;
  }
  return autoMowers;
}
