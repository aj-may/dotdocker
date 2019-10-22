export default {
  Image: 'andyshinn/dnsmasq:latest',
  name: 'dotdocker-dnsmasq',
  Cmd: ['-p 822:822/tcp', '-p 822:822/udp', '--address=/docker/127.0.0.1', '--log-facility=-'],
  ExposedPorts: {
    '822/tcp': {},
    '822/udp': {},
  },
  HostConfig: {
    PortBindings: {
      '822/tcp': [
        {
          HostPort: '822',
        },
      ],
      '822/udp': [
        {
          HostPort: '822',
        },
      ],
    },
    RestartPolicy: { Name: 'always' },
    CapAdd: ['NET_ADMIN'],
  },
};
