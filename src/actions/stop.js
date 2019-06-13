import Listr from 'listr';
import stopContainer from '../tasks/stopContainer';
import proxyConfig from '../containers/proxyConfig';
import dnsmasqConfig from '../containers/dnsmasqConfig';

const stop = () =>
  new Listr([stopContainer(proxyConfig), stopContainer(dnsmasqConfig)], { concurrent: true }).run();

export default stop;
