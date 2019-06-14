import Docker from 'dockerode';
import { getContainer } from '../utils';

const docker = new Docker();

const startContainer = ({ name }) => ({
  title: `Starting ${name}`,
  task: async () => {
    try {
      const { Id: id } = await getContainer(name);
      await docker.getContainer(id).start();
    } catch (err) {
      const match = err.json.message.match(
        /Bind for 0\.0\.0\.0:(\d+): unexpected error \(Failure EADDRINUSE\)/,
      );
      if (match) throw new Error(`Port ${match[1]} is already in use.`);
      throw err;
    }
  },
  skip: async () => {
    const container = await getContainer(name);
    if (!container) throw Error('Container does not exist');
    if (container.State === 'running') return 'Container already running';
    return false;
  },
});

export default startContainer;
