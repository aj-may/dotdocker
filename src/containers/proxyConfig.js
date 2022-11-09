import { homedir } from 'os';
import { resolve } from 'path';
import fs from 'fs';

const nginxProxyPath = resolve(homedir(), '.dotdocker/nginx_proxy.conf');
const nginxProxyBindings = fs.existsSync(nginxProxyPath)
  ? [`${nginxProxyPath}:/etc/nginx/conf.d/nginx_proxy.conf:ro`]
  : [];

export default {
  Image: 'codekitchen/dinghy-http-proxy:latest',
  name: 'dotdocker-proxy',
  Env: ['CONTAINER_NAME=dotdocker-proxy'],
  ExposedPorts: {
    '80/tcp': {},
    '443/tcp': {},
    '19322/udp': {},
  },
  HostConfig: {
    Binds: [
      '/var/run/docker.sock:/tmp/docker.sock:ro',
      `${resolve(homedir(), '.dotdocker/certs')}:/etc/nginx/certs:ro`,
      ...nginxProxyBindings,
    ],
    PortBindings: {
      '19322/udp': [
        {
          HostPort: '19322',
        },
      ],
      '443/tcp': [
        {
          HostPort: '443',
        },
      ],
      '80/tcp': [
        {
          HostPort: '80',
        },
      ],
    },
    RestartPolicy: { Name: 'always' },
  },
};
