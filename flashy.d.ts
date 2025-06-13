export interface FlashyOptions {
  type?: "success" | "error" | "warning" | "info" | "default";
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  duration?: number;
  closable?: boolean;
  animation?: "slide" | "fade" | "bounce" | "zoom";
  theme?: "light" | "dark";
  icon?: string | null;
  onClick?: (() => void) | null;
  onClose?: (() => void) | null;
}

export interface FlashyInstance {
  (message: string, options?: FlashyOptions | string): () => void;
  success: (message: string, options?: Omit<FlashyOptions, "type">) => () => void;
  error: (message: string, options?: Omit<FlashyOptions, "type">) => () => void;
  warning: (message: string, options?: Omit<FlashyOptions, "type">) => () => void;
  info: (message: string, options?: Omit<FlashyOptions, "type">) => () => void;
  closeAll: () => void;
  setDefaults: (newDefaults: Partial<FlashyOptions>) => void;
  getOptions: () => FlashyOptions;
  destroy: () => void;
  version: string;
}

declare const flashy: FlashyInstance;
export default flashy;
