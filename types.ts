import { Subscriber } from "./subscriber";

export type NextMethod<T> = (x: T) => void;
export type ErrorMethod<T> = (err: any) => void;
export type CompleteMethod<T> = () => void;

export type SubscribeCallback<T> = (subscriber: Subscriber<T>) => () => void;

export type MapFn<T> = (value: T) => any;
export type FilterFn<T> = (value: T) => boolean;