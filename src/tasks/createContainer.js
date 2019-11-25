import Docker from 'dockerode';
import { getContainer } from '../utils';

const docker = new Docker();

const createContainer = containerConfig => ({
  title: `Creating ${containerConfig.name}`,
  task: () => docker.createContainer(containerConfig),
  skip: async () => {
    try {
      const container = await getContainer(containerConfig.name);
      if (container) return 'Container already created';
      return false;
    } catch (err) {
      if (err.code === 'ECONNREFUSED')
        throw new Error('Can not connect to docker. Is docker running?');
      throw err;
    }
  },
});

export default createContainer;
