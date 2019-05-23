
const path = require('path');

export const fileDirectory = __dirname + '../../../../../private/files';

export const imageDirectory = () => {
  const fileName =  path.join(fileDirectory + '/images/' );
  return fileName;
}

export const videoDirectory = () => {
  const fileName =  path.join(fileDirectory + '/videos/' );
  return fileName;
}