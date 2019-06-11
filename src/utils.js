import Docker from 'dockerode';
import { access } from 'fs';

const docker = Docker();

export const getImage = async tag => {
  const images = await docker.listImages({ filters: { reference: [tag] } });
  return images[0];
};

export const getContainer = async name => {
  const containers = await docker.listContainers({ all: true, filters: { name: [name] } });
  return containers[0];
};

export const fileExists = path => new Promise(resolve => access(path, null, err => resolve(!err)));
