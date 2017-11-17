import * as React from 'react';
import { Breadcrumb, Segment } from 'semantic-ui-react';
import { Folder } from '../containers/Entity';

interface BreadcrumbProps {
  currentDirectory: Folder;
  directoryHandler: (target: Folder) => void;
}

class FinderBreadcrumb extends React.Component<BreadcrumbProps> {
  render() {
    const pathSplit = this.props.currentDirectory.getPath().split('/');
    return (
      <Segment basic={true} style={{ margin: 0, height: 36 }}>
        <Breadcrumb>
          {
            pathSplit.map(
              (directoryName, idx, array) => (
                idx === array.length - 1 ?
                  <Breadcrumb.Section active={true}>{directoryName}</Breadcrumb.Section> :
                  (
                    <span>
                      <Breadcrumb.Section link={true}>{directoryName}</Breadcrumb.Section>
                      <Breadcrumb.Divider />
                    </span>
                  )
              )
            )
          }
        </Breadcrumb>
      </Segment>
    );
  }
}

export default FinderBreadcrumb;
