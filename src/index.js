import program from 'commander';
import Listr from 'listr';
import pullImage from './tasks/pullImage';
import createContainer from './tasks/createContainer';
import startContainer from './tasks/startContainer';
import stopContainer from './tasks/stopContainer';
import setupDNS from './tasks/setupDNS';
import proxyConfig from './containers/proxyConfig';
import dnsmasqConfig from './containers/dnsmasqConfig';

program
  .version('1.0.0')
  .description('A utility to help setup a docker development environment with host based routing');

program
  .command('start')
  .description('Pull and start the dotdocker containers and configure DNS')
  .action(() =>
    new Listr([
      pullImage(proxyConfig),
      createContainer(proxyConfig),
      startContainer(proxyConfig),
      pullImage(dnsmasqConfig),
      createContainer(dnsmasqConfig),
      startContainer(dnsmasqConfig),
      setupDNS(),
    ]).run(),
  );

program
  .command('stop')
  .description('Stop the dotdocker containers')
  .action(() => new Listr([stopContainer(proxyConfig), stopContainer(dnsmasqConfig)]).run());

program
  .command('restart')
  .description('Restart the dotdocker containers')
  .action(() =>
    new Listr([
      stopContainer(proxyConfig),
      stopContainer(dnsmasqConfig),
      startContainer(proxyConfig),
      startContainer(dnsmasqConfig),
    ]).run(),
  );

program.parse(process.argv);
if (!program.args.length) program.help();
