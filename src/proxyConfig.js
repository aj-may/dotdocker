import { homedir } from 'os';
import { resolve } from 'path';

export default {
  Image: 'codekitchen/dinghy-http-proxy:latest',
  name: 'dotdocker-proxy',
  Env: ['CONTAINER_NAME=dotdocker-proxy'],
  HostConfig: {
    Binds: [
      '/var/run/docker.sock:/tmp/docker.sock:ro',
      `${resolve(homedir(), '.dotdocker/certs')}:/etc/nginx/certs:ro`,
    ],
    PortBindings: {
      '80/tcp': [{ HostPort: '80' }],
      '443/tcp': [{ HostPort: '443' }],
      '19322/udp': [{ HostPort: '19322' }],
    },
    RestartPolicy: { Name: 'always' },
  },
};
