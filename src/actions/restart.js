import Listr from 'listr';
import stopContainer from '../tasks/stopContainer';
import startContainer from '../tasks/startContainer';
import proxyConfig from '../containers/proxyConfig';
import dnsmasqConfig from '../containers/dnsmasqConfig';

const restart = () =>
  new Listr(
    [
      {
        title: 'Restart proxy',
        task: () => new Listr([stopContainer(proxyConfig), startContainer(proxyConfig)]),
      },
      {
        title: 'Restart dnsmasq',
        task: () => new Listr([stopContainer(dnsmasqConfig), startContainer(dnsmasqConfig)]),
      },
    ],
    { concurrent: true },
  ).run();

export default restart;
