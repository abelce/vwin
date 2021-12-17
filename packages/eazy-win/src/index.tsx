import * as React from 'react';
import './style.scss';
import { EazyWinProps } from './types';

const EazyWin: React.FC<EazyWinProps> = props => {
  return (
    <div className="eazy-win">
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
