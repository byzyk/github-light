import React from 'react';
import { connect } from 'react-redux';
import { Input, message } from 'antd';
import { IDispatchProp } from 'store/types';
import { flush } from 'store/modules/root';
import { fetchUser } from 'store/modules/user';
import './style.less';

const { Search } = Input;

class UserSearch extends React.Component<IDispatchProp> {
  search = (value: string) => {
    const username = value.trim();
    if (username.length) {
      this.props.dispatch(flush());
      this.props.dispatch(fetchUser.request(username));
    } else {
      message.error('Search bar cannot be empty');
    }
  };

  render() {
    return (
      <Search
        className="search"
        placeholder="Search by name"
        onSearch={this.search}
        enterButton={true}
        size="large"
      />
    );
  }
}

export default connect()(UserSearch);
