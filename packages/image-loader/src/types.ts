export interface ImageLoaderProps {
  className?: string;
  style?: object;
  src: string;
  thumbSrc?: string;
  errSrc?: string;
}

export enum LoadingStatusEnum {
  None = 'none',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export type ImageLoaderState = {
  loadingStatus: LoadingStatusEnum;
};