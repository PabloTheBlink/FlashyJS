export interface FlashyOptions {
  type?: 'success' | 'error' | 'warning' | 'info' | 'default' | 'loading';
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number;
  closable?: boolean;
  animation?: 'spring' | 'slide' | 'fade' | 'bounce' | 'zoom';
  theme?: 'light' | 'dark' | 'auto' | 'glass' | 'aurora' | 'midnight';
  icon?: string | null;
  description?: string;
  image?: string;
  imageAlt?: string;
  action?: { label: string; onClick: () => void } | null;
  onClick?: (() => void) | null;
  onClose?: (() => void) | null;
  visibleToasts?: number;
}
export interface FlashyPromiseMessages<T> {
  loading: string;
  success: string | ((value: T) => string);
  error: string | ((error: unknown) => string);
}
export interface FlashyInstance {
  (message: string, options?: FlashyOptions | string): () => void;
  success: (message: string, options?: Omit<FlashyOptions, 'type'>) => () => void;
  error: (message: string, options?: Omit<FlashyOptions, 'type'>) => () => void;
  warning: (message: string, options?: Omit<FlashyOptions, 'type'>) => () => void;
  info: (message: string, options?: Omit<FlashyOptions, 'type'>) => () => void;
  promise: <T>(promiseOrFn: PromiseLike<T> | (() => PromiseLike<T> | T), messages: FlashyPromiseMessages<T>) => Promise<T>;
  closeAll: () => void;
  setDefaults: (newDefaults: Partial<FlashyOptions>) => void;
  getOptions: () => FlashyOptions;
  destroy: () => void;
  version: string;
}
declare const flashy: FlashyInstance;
export { flashy };
export default flashy;
