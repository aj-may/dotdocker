import program from 'commander';
import start from './actions/start';
import stop from './actions/stop';
import restart from './actions/restart';
import { version } from '../package.json';

program
  .version(version)
  .description('A utility to help setup a docker development environment with host based routing');

program
  .command('start')
  .description('Pull and start the dotdocker containers and configure DNS')
  .action(start);

program
  .command('stop')
  .description('Stop the dotdocker containers')
  .action(stop);

program
  .command('restart')
  .description('Restart the dotdocker containers')
  .action(restart);

program.parse(process.argv);
if (program.rawArgs.length < 3) program.help();
