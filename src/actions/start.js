import Listr from 'listr';
import pullImage from '../tasks/pullImage';
import createContainer from '../tasks/createContainer';
import startContainer from '../tasks/startContainer';
import setupDNS from '../tasks/setupDNS';
import proxyConfig from '../containers/proxyConfig';
import dnsmasqConfig from '../containers/dnsmasqConfig';

const start = () =>
  new Listr([
    {
      title: 'Start dotdocker containers',
      task: () =>
        new Listr(
          [
            {
              title: 'Start proxy',
              task: () =>
                new Listr([
                  pullImage(proxyConfig),
                  createContainer(proxyConfig),
                  startContainer(proxyConfig),
                ]),
            },
            {
              title: 'Start dnsmasq',
              task: () =>
                new Listr([
                  pullImage(dnsmasqConfig),
                  createContainer(dnsmasqConfig),
                  startContainer(dnsmasqConfig),
                ]),
            },
          ],
          { concurrent: true },
        ),
    },
    setupDNS(),
  ]).run();

export default start;
