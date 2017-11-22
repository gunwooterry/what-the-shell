import * as React from 'react';
import { Breadcrumb, Segment } from 'semantic-ui-react';
import { Folder } from '../containers/Entity';

interface BreadcrumbProps {
  currentDirectory: Folder;
  directoryHandler: (target: Folder) => void;
}

class FinderBreadcrumb extends React.Component<BreadcrumbProps> {
  render() {
    const currentDirectory = this.props.currentDirectory;
    const lineage: Folder[] = [currentDirectory];
    let folderWalker = currentDirectory.parent;
    while (folderWalker) {
      lineage.push(folderWalker);
      folderWalker = folderWalker.parent;
    }
    lineage.reverse();

    const activeSection = (directory: Folder) =>
      <Breadcrumb.Section active={true}>{directory.name}</Breadcrumb.Section>;
    const inactiveSection = (directory: Folder) => (
      <span>
        <Breadcrumb.Section
          link={true}
          onClick={() => this.props.directoryHandler(directory)}
        >
          {directory.name}
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
      </span>
    );

    return (
      <Segment basic={true} style={{ margin: 0, height: 36 }}>
        <Breadcrumb>
          {
            lineage.map(
              (directory, idx, array) => (
                idx === array.length - 1 ? activeSection(directory) : inactiveSection(directory)
              )
            )
          }
        </Breadcrumb>
      </Segment>
    );
  }
}

export default FinderBreadcrumb;
