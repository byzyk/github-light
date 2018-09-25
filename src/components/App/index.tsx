import React from 'react';
import { Layout, Icon } from 'antd';
import UserSearch from 'components/UserSearch';
import User from 'components/User';
import Repos from 'components/Repos';
import './style.less';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <Icon type="github" />: Hello there!
          </div>
        </Header>
        <Content className="layout-content">
          <div className="layout-content-inner">
            <UserSearch />
            <User />
            <Repos />
          </div>
        </Content>
        <Footer className="layout-footer">Bohdan Khodakivskyi © 2018</Footer>
      </Layout>
    );
  }
}

export default App;
