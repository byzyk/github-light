import React from 'react';
import { connect } from 'react-redux';
import { List, Icon } from 'antd';
import { IRootState } from 'store/modules/root';
import { IReposState, IRepo } from 'store/modules/repos';
import Loading from 'components/Loading';
import InfoItem from 'components/InfoItem';
import './style.less';

const { Item } = List;

export interface IProps {
  repos: IReposState;
}

const Repos = ({ repos }: IProps) => (
  <Loading loading={repos.isLoading}>
    {!!repos.data.length && (
      <div className="repos">
        <h2>Repos</h2>
        <List
          itemLayout="vertical"
          dataSource={repos.data}
          renderItem={(repo: IRepo) => (
            <Item>
              <Item.Meta
                title={
                  <React.Fragment>
                    <a href={repo.html_url}>{repo.name}</a>
                    {repo.fork && (
                      <small className="repos-forked">forked</small>
                    )}
                  </React.Fragment>
                }
                description={repo.description}
              />
              <div className="repos-details">
                <InfoItem label={<Icon type="fork" />}>{repo.forks}</InfoItem>
                <InfoItem label="open issues">{repo.open_issues}</InfoItem>
                <InfoItem label="watchers">{repo.watchers}</InfoItem>
              </div>
            </Item>
          )}
        />
      </div>
    )}
  </Loading>
);

const props = (state: IRootState) => ({
  repos: state.repos,
});

export default connect(props)(Repos);
