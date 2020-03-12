import FileExtractor from './services/FileExtractor';
import Orientation from './models/Orientation';

try {
  const filePath = process.argv[2];
  const extractedFile = FileExtractor(filePath);

  extractedFile.forEach((movements, autoMower) => {
    autoMower.drive(movements);
    // eslint-disable-next-line no-console
    console.log(`${autoMower.x} ${autoMower.y} ${Orientation[autoMower.orientation]}`);
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
}
