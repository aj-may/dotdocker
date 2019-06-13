export default {
  Image: 'andyshinn/dnsmasq:latest',
  name: 'dotdocker-dnsmasq',
  Cmd: ['--address=/docker/127.0.0.1', '--log-facility=-'],
  ExposedPorts: {
    '53/tcp': {},
    '53/udp': {},
  },
  HostConfig: {
    PortBindings: {
      '53/tcp': [
        {
          HostPort: '53',
        },
      ],
      '53/udp': [
        {
          HostPort: '53',
        },
      ],
    },
    RestartPolicy: { Name: 'always' },
    CapAdd: ['NET_ADMIN'],
  },
};
