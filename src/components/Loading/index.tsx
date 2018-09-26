import React from 'react';
import { Spin } from 'antd';

interface IProps {
  loading: boolean;
  children?: React.ReactNode;
  mode?: 'hide' | 'overlay';
}

interface IState {
  loading: boolean;
}

class Loading extends React.Component<IProps, IState> {
  static defaultProps: Partial<IProps> = {
    children: null,
    mode: 'hide',
  };

  state = {
    loading: false,
  };

  componentWillReceiveProps(nextProps: any) {
    this.setLoading(nextProps.loading);
  }

  componentDidMount() {
    this.setLoading(this.props.loading);
  }

  setLoading(loading: boolean) {
    this.setState({ loading });
  }

  render() {
    const { children, mode } = this.props;
    const { loading } = this.state;
    let component;

    if (mode === 'hide') {
      component = loading ? (
        <Spin spinning={loading} size="large">
          <div style={{ minHeight: '150px' }} />
        </Spin>
      ) : (
        children
      );
    }

    if (mode === 'overlay') {
      component = (
        <Spin spinning={loading} size="large">
          {children}
        </Spin>
      );
    }

    return component;
  }
}

export default Loading;
