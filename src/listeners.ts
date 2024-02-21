import { Command, Message } from './structures';

type EventPayload = {
  message: Message;
};

type EventMap = {
  // For all other types besides onMessageUpdate, an array with a single element will be returned.
  // For the type onMessageUpdate, the current array containing all the latest messages (taking into account the maxCache value) will be returned.
  [Key in `on${Command | 'All' | 'MessageUpdate'}`]: EventPayload[];
};
type EventName = keyof EventMap & string;
type EventListener = (params: EventPayload) => void;

const listeners: {
  [K in EventName]?: Array<EventListener>;
} = {};

export function call(name: EventName, params: EventPayload) {
  listeners[name]?.forEach((listener) => {
    listener(params);
  });
}

export function subscribe(name: EventName, fn: EventListener) {
  if (!listeners[name]) {
    listeners[name] = [];
  }
  listeners[name]!.push(fn);
}

export function unsubscribe(name: EventName, fn: EventListener) {
  if (listeners[name]) {
    listeners[name] = listeners[name]!.filter((listener) => listener !== fn);
  }
}
