import { register, subscribe } from '.';

register();
subscribe('onAll', (message) => {
  // we have to use #skip prefix to avoid looping
  console.log('#skip onAll message', message[0]);
});

console.log('demo1');
console.warn('demo2', {
  time: 0,
});
