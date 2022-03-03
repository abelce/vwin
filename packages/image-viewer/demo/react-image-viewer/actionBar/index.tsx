import React from 'react';
import { actionsConfig } from './config';
import { ActionOption } from './types';

export default class ActionBar extends React.Component {
  actions: Array<ActionOption> = actionsConfig;

  render() {
    return <div></div>;
  }
}
