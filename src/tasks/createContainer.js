import Docker from 'dockerode';
import { getContainer, removeContainer } from '../utils';

const docker = new Docker();

const createContainer = containerConfig => ({
  title: `Creating ${containerConfig.name}`,
  task: async () => docker.createContainer(containerConfig),
  skip: async () => {
    try {
      const { Labels } = containerConfig;
      const port = Labels ? Labels.port || null : null;
      const container = await getContainer(containerConfig.name);

      if (container) {
        const containerPort = container.Labels ? container.Labels.port || null : null;
        const shouldUpsertContainer = containerPort && containerPort !== port;

        if (shouldUpsertContainer) {
          await removeContainer(container.Id);
        } else {
          return 'Container already created';
        }
      }

      return false;
    } catch (err) {
      if (err.code === 'ECONNREFUSED')
        throw new Error('Can not connect to docker. Is docker running?');
      throw err;
    }
  },
});

export default createContainer;
