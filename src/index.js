import program from 'commander';
import Listr from 'listr';
import pullImage from './tasks/pullImage';
import createContainer from './tasks/createContainer';
import startContainer from './tasks/startContainer';
import stopContainer from './tasks/stopContainer';
import setupDNS from './tasks/setupDNS';
import proxyConfig from './proxyConfig';

program
  .version('1.0.0')
  .description('A utility to help setup a docker development environment with host based routing');

program
  .command('start')
  .description('Pull and start the proxy container and configure DNS')
  .action(() =>
    new Listr([
      pullImage(proxyConfig),
      createContainer(proxyConfig),
      startContainer(proxyConfig),
      setupDNS(),
    ]).run(),
  );

program
  .command('stop')
  .description('Stop the proxy container')
  .action(() => new Listr([stopContainer(proxyConfig)]).run());

program
  .command('restart')
  .description('Restart the proxy container')
  .action(() => new Listr([stopContainer(proxyConfig), startContainer(proxyConfig)]).run());

program.parse(process.argv);
if (!program.args.length) program.help();
