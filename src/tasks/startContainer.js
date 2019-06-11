import Docker from 'dockerode';
import { getContainer } from '../utils';

const docker = new Docker();

const startContainer = ({ name }) => ({
  title: `Starting ${name}`,
  task: async () => {
    const { Id: id } = await getContainer(name);
    return docker.getContainer(id).start();
  },
  skip: async () => {
    const container = await getContainer(name);
    if (!container) throw Error('Container does not exist');
    if (container.State === 'running') return 'Container already running';
    return false;
  },
});

export default startContainer;
