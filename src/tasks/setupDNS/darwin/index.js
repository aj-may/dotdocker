import Listr from 'listr';
import execa from 'execa';
import { resolve } from 'path';
import { fileExists } from '../../../utils';

const srcPath = resolve(__dirname, 'resolver/docker');
const resolverPath = '/etc/resolver/';
const destPath = resolve(resolverPath, 'docker');

export default {
  title: 'Setting up DNS',
  task: () =>
    new Listr([
      {
        title: 'Creating resolver configuration directory',
        task: () => execa('sudo', ['mkdir', '-p', resolverPath]),
        skip: () => fileExists(resolverPath),
      },
      {
        title: 'Creating resolver configuration file',
        task: () => execa('sudo', ['cp', srcPath, destPath]),
      },
      {
        title: 'Sending reload signal to mDNSResponder',
        task: () => execa('sudo', ['killall', '-HUP', 'mDNSResponder']),
      },
    ]),
  skip: async () => {
    const exists = await fileExists(destPath);
    if (exists) return 'Resolver is already configured';
    return false;
  },
};
