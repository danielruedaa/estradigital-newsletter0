import React from 'react';
import PromiseStyle from './promise.css';
import FlexLayout from 'vtex.flex-layout/FlexLayout';
import classnames from 'classnames';

export interface PromiseListProps {
  icon: string;
  title: string;
  description: string;
}

export interface PromiseProps {
  lineHeight: number;
  blockHeight: number;
  mode: string;
  promiseList: PromiseListProps[];
  fullWidth: boolean;
}

const Promise = (props: PromiseProps) => {
  const { blockHeight, promiseList, mode, lineHeight, fullWidth } = props;
  const classesItem = classnames(PromiseStyle.promiseItemContainer,mode == 'line' && PromiseStyle.promiseItemLine);
  return <div className={PromiseStyle.promiseContainer} style={{height: mode == 'block' ? blockHeight : lineHeight}}>
    <FlexLayout fullWidth={fullWidth} blockClass="promise-container">
      {promiseList.map(promise => {
        return <div className={classesItem}>
          <img className={PromiseStyle.promiseItemImage} src={promise.icon} alt={promise.title}/>
          <div className={PromiseStyle.promiseItemTitle}>{promise.title}</div>
          {mode == 'block' && <div className={PromiseStyle.flexspace}></div>}
          {mode == 'block' && <div className={PromiseStyle.promiseItemDescription}>{promise.description}</div>}
        </div>
      })}
    </FlexLayout>
  </div>
}

export default Promise;
