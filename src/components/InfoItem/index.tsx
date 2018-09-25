import React from 'react';
import './style.less';

export interface IProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
}

export default ({ label, children }: IProps) => (
  <div className="info-item">
    <span className="info-item-label">{label}</span>
    <span className="info-item-value">{children}</span>
  </div>
);
