import Docker from 'dockerode';
import { getContainer } from '../utils';

const docker = new Docker();

const stopContainer = ({ name }) => ({
  title: `Stopping ${name}`,
  task: async () => {
    const { Id: id, State: state } = await getContainer(name);
    const container = docker.getContainer(id);

    if (state === 'running') await container.stop();
    return container.remove();
  },
  skip: async () => {
    const container = await getContainer(name);
    if (!container) return 'Container does not exist';
    return false;
  },
});

export default stopContainer;
