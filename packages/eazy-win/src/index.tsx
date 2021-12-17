import * as React from 'react';
import { EazyWinProps } from './types';
import classnames from 'classnames';
import './style.scss';

const EazyWin: React.FC<EazyWinProps> = props => {
  const className = classnames('eazy-win', {
    'eazy-win-dark': props.theme === 'dark',
  });
  return (
    <div className={className}>
      <div className="eazy-win-header">
        <div className="win-controll-container">
          <div className="win-controll win-controll-close"></div>
          <div className="win-controll win-controll-min"></div>
          <div className="win-controll win-controll-full"></div>
        </div>
      </div>
      <div className="eazy-win-body">{props.children}</div>
    </div>
  );
};

export default EazyWin;
