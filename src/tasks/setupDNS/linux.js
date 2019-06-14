import { readFile as readFileCallback, writeFile as writeFileCallback } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCallback);
const writeFile = promisify(writeFileCallback);
const resolverPath = '/etc/resolv.conf';
const resolverLine = 'nameserver 127.0.0.1 # Generated by dotdocker';

export default {
  title: 'Setting up DNS',
  task: async () => {
    try {
      const resolverContents = await readFile(resolverPath);
      await writeFile(resolverPath, `${resolverLine}\n\n${resolverContents}`);
    } catch (err) {
      if (err.code === 'EACCES')
        throw new Error(
          'This task needs elevated permissions. Please run again using sudo. This only needs to be done once.',
        );
      throw err;
    }
  },
  skip: async () => {
    const resolverContents = await readFile(resolverPath);
    return resolverContents.includes(resolverLine);
  },
};