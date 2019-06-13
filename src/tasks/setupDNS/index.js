import { capitalize } from 'lodash';
import darwinDnsSetup from './darwin';
import linuxDnsSetup from './linux';

const setupDNS = () => {
  switch (process.platform) {
    case 'darwin':
      return darwinDnsSetup;

    case 'linux':
      return linuxDnsSetup;

    default:
      return {
        title: `Setting up DNS`,
        task: () => {
          throw new Error(`${capitalize(process.platform)} platform not yet supported`);
        },
      };
  }
};

export default setupDNS;
