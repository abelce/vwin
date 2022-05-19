import { ActionNames } from 'packages/image-viewer/src/actions/actionNames';
import React from 'react';
import { ActionItem } from './ActionItem';
import { actionsConfig } from './config';
import { ActionBarProps, ActionOption } from './types';
import styles from './style.scss';

export default class ActionBar extends React.Component<ActionBarProps> {
  actions: Array<ActionOption> = actionsConfig;

  constructor(props: ActionBarProps) {
    super(props);
    this.state = {
      activeAction: null,
    };
  }

  private handleActionClick = (
    actionName: ActionNames,
    action: ActionOption,
  ) => {
    this.props.imageViewer.changeActiveAction(actionName);
    this.setState(
      {
        activeAction: action,
      },
      () => {
        //设置鼠标颜色
        this.props.imageViewer.canvas.style.cursor = this.state.activeAction?.cursorIcon;
      },
    );
  };

  render() {
    return (
      <div className={styles.ActionBar}>
        {this.actions.map(action => (
          <ActionItem
            key={action.actionKey}
            action={action}
            currentActionName={this.state.activeAction}
            onClick={this.handleActionClick}
          />
        ))}
      </div>
    );
  }
}
