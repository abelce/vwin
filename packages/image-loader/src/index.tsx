import * as React from 'react';
import 'intersection-observer';
import { ImageLoaderProps, ImageLoaderState, LoadingStatusEnum } from './types';
import classnames from 'classnames';
import './index.scss';

class ImageLoader extends React.Component<ImageLoaderProps, ImageLoaderState> {
  imgRef: React.RefObject<HTMLImageElement>;

  constructor(props: ImageLoaderProps) {
    super(props);
    if (!this.props.src) {
      throw new Error('the src is required');
    }
    this.imgRef = React.createRef<HTMLImageElement>();
    this.state = {
      loadingStatus: LoadingStatusEnum.None,
    };
  }

  componentDidMount() {
    this.listener();
  }

  listener = () => {
    if (
      [LoadingStatusEnum.Loading, LoadingStatusEnum.Success].includes(
        this.state.loadingStatus,
      )
    ) {
      return;
    }
    const img: any = this.imgRef.current;
    let observer = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio > 0) {
        let newImg = new Image();

        this.setState({
          loadingStatus: LoadingStatusEnum.Loading,
        });

        new Promise(resolve => {
          newImg.src = this.props.src;
          newImg.onload = resolve;
        })
          .then(() => {
            this.setState({
              loadingStatus: LoadingStatusEnum.Success,
            });
            observer.disconnect();
          })
          .catch(() => {
            this.setState({
              loadingStatus: LoadingStatusEnum.Failed,
            });
          });
      }
    });
    observer.observe(img);
  };

  getSrc = (): string => {
    const { src = '', thumbSrc = '', errSrc = '' } = this.props;
    const { loadingStatus } = this.state;
    switch (loadingStatus) {
      case LoadingStatusEnum.Success:
        return src || thumbSrc;
      case LoadingStatusEnum.Failed:
        return errSrc;
      default:
        return thumbSrc;
    }
  };

  render() {
    const { className, ...others } = this.props;
    const src = this.getSrc();
    const _className = classnames(
      {
        'image-loader-empty': !src,
      },
      className || '',
    );
    return (
      <img
        {...others}
        ref={this.imgRef as any}
        className={_className}
        src={this.getSrc()}
      />
    );
  }
}

export default ImageLoader;
