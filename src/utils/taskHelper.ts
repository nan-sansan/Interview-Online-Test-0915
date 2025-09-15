type ErrorHandledTaskOptions<T> = {
  onStart?: () => Promise<void> | unknown;
  task: () => Promise<T> | T;
  onError: (e: Error) => Promise<T> | T;
};

export const taskWithErrorHandler = async <T>({ onStart, task, onError }: ErrorHandledTaskOptions<T>) => {
  try {
    if (onStart) await onStart();
    return await task();
  } catch (rawError) {
    return await onTaskError(onError, toError(rawError));
  }
};

const onTaskError = async <T>(errorHandler: (e: Error) => Promise<T> | T, error: Error) => {
  try {
    return await errorHandler(error);
  } catch (rawErrorHandlerError) {
    const errorHandlerError = toError(rawErrorHandlerError);
    throw new Error(
      `Task failed with error: ${error.message}. Additionally, onError handler failed with error: ${errorHandlerError.message}.`
    );
  }
};

export const toError = (rawError: unknown) => {
  if (rawError instanceof Error) {
    return rawError;
  } else {
    return new Error(String(rawError));
  }
};
