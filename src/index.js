import program from 'commander';
import start from './actions/start';
import stop from './actions/stop';
import restart from './actions/restart';
import { version } from '../package.json';

const isDarwin = process.platform === 'darwin';

program
  .version(version)
  .description('A utility to help setup a docker development environment with host based routing');

program
  .command('start')
  .option('-p, --port <port>', 'port')
  .description('Pull and start the dotdocker containers and configure DNS')
  .action(res => {
    start(isDarwin ? res.port : 53);
  });

program
  .command('stop')
  .description('Stop the dotdocker containers')
  .action(stop);

program
  .command('restart')
  .description('Restart the dotdocker containers')
  .action(restart);

program.parse(process.argv);
if (!program.args.length) program.help();
