import { PropertySafetyFilled } from '@ant-design/icons';
import React from 'react';
import Upload from './index';
import { SingleUploadProps } from './types';

// 单张图片
export const UploadSingle = (props: SingleUploadProps): JSX.Element => {
  const onChange = (value: Array<string>) => {
    if (typeof props.onChange === 'function') {
      props.onChange(value.length ? value[0] : undefined);
    }
  };
  return <Upload {...props} maxLength={1} onChange={onChange} />;
};
