import React, { useCallback } from 'react';
import classnames from 'classnames';
import IconFont from '../component/IconFont';
import { ActionItemProps } from './types';
import styles from './style.scss';

export const ActionItem = (props: ActionItemProps) => {
  const handleClick = useCallback(() => {
    props?.onClick(props.action?.actionKey, props.action);
  }, []);
  const className = classnames(styles['action-item'], {
    [styles['action-item_active']]:
      props.action?.actionName === props.currentActionName,
  });
  return (
    <div className={className} onClick={handleClick}>
      <IconFont type={props.action?.actionIcon} />
      {props.action?.actionName}
    </div>
  );
};
