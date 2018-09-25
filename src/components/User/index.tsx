import React from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import { IRootState } from 'store/modules/root';
import { IUserState } from 'store/modules/user';
import Loading from 'components/Loading';
import InfoItem from 'components/InfoItem';
import './style.less';

export interface IProps {
  user: IUserState;
}
const User = ({ user }: IProps) => (
  <Loading loading={user.isLoading}>
    {user.data && (
      <div className="user">
        <Avatar src={user.data.avatar_url} size={160} shape="square" />
        <div className="user-details">
          <h2 className="user-name">
            <a href={user.data.html_url}>
              {user.data.name} <small>{user.data.login}</small>
            </a>
          </h2>
          <InfoItem label="followers">{user.data.followers}</InfoItem>
          <InfoItem label="following">{user.data.following}</InfoItem>
          <InfoItem label="location">{user.data.location}</InfoItem>
        </div>
      </div>
    )}
    {user.error && <div className="user-error">{user.error}</div>}
  </Loading>
);

const props = (state: IRootState) => ({
  user: state.user,
});

export default connect(props)(User);
