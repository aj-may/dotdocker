import Docker from 'dockerode';

const docker = Docker();

export const getImage = async tag => {
  const images = await docker.listImages({ filters: { reference: [tag] } });
  return images[0];
};

export const getContainer = async name => {
  const containers = await docker.listContainers({ all: true, filters: { name: [name] } });
  return containers[0];
};

export const removeContainer = async id => {
  const container = await docker.getContainer(id);
  const containerDetails = await container.inspect();
  if (containerDetails.State.Running) await container.kill();
  await container.remove();

  return true;
};
