import React, { memo } from 'react';
import { BlockProps } from './types';
import classnames from 'classnames';
import './style.scss';

const Block: React.FC<BlockProps> = (props): JSX.Element => {
  const contentStyle = {
    minHeight: '1em',
    with: '100%',
    // whiteSpace: "pre-wrap",
    // wordBreak: "word-break",
    padding: '3px 2px',
  };

  return (
    <div
      data-block-id="asdasdas"
      className={classnames('somo-selectable', 'somo-text-block')}
    >
      asfafasd
      <div contentEditable style={contentStyle}></div>
    </div>
  );
};

export default memo(Block);
