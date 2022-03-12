import { UploadProps } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

export interface MyUploadProps extends Omit<UploadProps, 'onChange'> {
  value: Array<string>;
  onChange: (value: Array<string>) => void;
  maxLength?: number; // 最大长度
}

export type MyUploadState = {
  previewVisible: boolean;
  previewImage: string;
  fileList: Array<UploadFile>;
  value: Array<string>;
};

export interface SingleUploadProps
  extends Omit<Omit<MyUploadProps, 'onChange'>, 'maxLength'> {
  onChange: (value: string | undefined) => void;
}
