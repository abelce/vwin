import { autobind } from 'core-decorators';
import { ActionNames } from 'packages/image-viewer/src/actions/actionNames';
import React, { createRef } from 'react';
import ImageViewer from '../../src/ImageViewer';
import ActionBar from './actionBar';
import styles from './style/index.scss';

@autobind
export default class ReactImageViewer extends React.Component {
  _ref = createRef();

  imageViewer: ImageViewer;

  componentDidMount() {
    this.initImageViewer();
  }

  initImageViewer() {
    this.imageViewer = new ImageViewer({
      container: this._ref?.current,
      srcList: ['https://static.vwood.xyz/blog/WX20211217-215252@2x.png'],
      width: 1000,
      height: 600,
    });
    this.forceUpdate();
  }

  changeActiveAction = (actionName: ActionNames) => {
    this.imageViewer.changeActiveAction(actionName);
  };

  render() {
    return (
      <div className={styles['react-image-viewer']}>
        <div className={styles['slider']}>
          <ActionBar imageViewer={this.imageViewer} />
        </div>
        <div className={styles['main']}>
          <div ref={this._ref}></div>
        </div>
      </div>
    );
  }
}
