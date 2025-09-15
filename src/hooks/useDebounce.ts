import { useEffect, useRef } from "react";

type Callback = () => void | Promise<void>;
type Lifecycle = {
  prevent?: () => boolean;
  before?: () => void;
  task: Callback;
  after?: () => void;
  destroy?: () => void;
};
type Task = Lifecycle | Callback;

const notPrevent = () => false;
const noop = () => {};

export const useDebounce = (input: Task, delay: number, deps: any[] = []) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const lifecycle = typeof input === "object" ? input : { task: input };
  const {
    prevent = notPrevent,
    before = noop,
    task,
    after = noop,
    destroy = noop,
  } = lifecycle;

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    cancel();

    if (!prevent()) {
      before();
      timeoutRef.current = setTimeout(async () => {
        try {
          await task();
        } finally {
          after();
        }
      }, delay);
    }

    return () => {
      destroy();
      cancel();
    };
  }, [...deps]);

  return cancel;
};
