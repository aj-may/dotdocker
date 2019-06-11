import Docker from 'dockerode';
import { getContainer } from '../utils';

const docker = new Docker();

const stopContainer = ({ name }) => ({
  title: `Stopping ${name}`,
  task: async () => {
    const { Id: id } = await getContainer(name);
    return docker.getContainer(id).stop();
  },
  skip: async () => {
    const container = await getContainer(name);
    if (!container) throw Error('Container does not exist');
    if (container.State === 'exited') return 'Container already stopped';
    return false;
  },
});

export default stopContainer;
