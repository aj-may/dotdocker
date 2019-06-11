import Docker from 'dockerode';
import { Transform } from 'stream';
import { getImage } from '../utils';

const docker = new Docker();

const dockerPullStreamTransformer = () =>
  new Transform({
    objectMode: true,
    transform: (chunk, encoding, callback) => {
      try {
        // The chuck is one or more lines of JSON objects
        // Parse only the last line in the chunk
        const lines = chunk
          .toString()
          .split(/[\r\n]+/g)
          .filter(l => !!l);
        const { id, status, progress = '' } = JSON.parse(lines[lines.length - 1]);

        callback(null, `${id}: ${status} ${progress}`);
      } catch (err) {
        // Return an empty string if the line received is not JSON
        callback(null, '');
      }
    },
  });

const pullImage = ({ Image: image }) => ({
  title: `Pulling ${image}`,
  task: async () => {
    try {
      const stream = await docker.pull(image);
      return stream.pipe(dockerPullStreamTransformer());
    } catch (err) {
      if (err.code === 'ECONNREFUSED')
        throw new Error('Can not connect to docker. Is docker running?');
      throw err;
    }
  },
  skip: async () => {
    try {
      const existingImage = await getImage(image);
      if (existingImage) return 'Image already exists';
      return false;
    } catch (err) {
      if (err.code === 'ECONNREFUSED')
        throw new Error('Can not connect to docker. Is docker running?');
      throw err;
    }
  },
});

export default pullImage;
