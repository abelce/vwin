import React from 'react';
import { Upload as AntUpload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MyUploadProps, MyUploadState } from './types';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import './style.scss';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class MyUpload extends React.Component<
  MyUploadProps,
  MyUploadState
> {
  get maxLength(): number {
    if (!this.props.maxLength) {
      return Infinity;
    }
    return this.props.maxLength;
  }

  constructor(props: MyUploadProps) {
    super(props);
    this.state = {
      value: this.props.value || [],
      fileList: MyUpload.getFileListFromProps(props.value) as Array<UploadFile>,
      previewImage: '',
      previewVisible: false,
    };
  }

  static getDerivedStateFromProps(
    nextProps: MyUploadProps,
    prevState: MyUploadState,
  ) {
    const newState: MyUploadState = {
      ...prevState,
    };
    if (nextProps.value !== prevState.value) {
      newState.value = nextProps.value;
      newState.fileList = MyUpload.getFileListFromProps(
        nextProps.value,
      ) as Array<UploadFile>;
    }
    return newState;
  }

  static getFileListFromProps = (value: Array<string> = []) => {
    return (value || []).map((url = '') => {
      const urlArr = url.split('/');
      const name = urlArr.length ? urlArr[urlArr.length - 1] : '';
      return {
        uid: `myupload-${+new Date()}`,
        name,
        status: 'done',
        url,
      };
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }

    this.setState({
      previewImage: (file.url || file.preview) as string,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file }: UploadChangeParam<UploadFile>) => {
    this.setState({ fileList });
    if (file.status && ['removed', 'done'].includes(file.status)) {
      const value = fileList
        .filter(file => file.status === 'done')
        .map(file => file.url || file.response?.url);
      console.log(value);
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value);
      }
    }
  };

  render() {
    const { onChange, ...reset } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
    return (
      <div className="vwin-upload">
        <AntUpload
          {...reset}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= this.maxLength ? null : uploadButton}
        </AntUpload>
        <Modal
          visible={previewVisible}
          title={'预览'}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
