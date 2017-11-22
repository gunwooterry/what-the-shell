import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Folder } from '../containers/Entity';
import EntityUnit from './EntityUnit';

interface FinderProps {
  currentDirectory: Folder;
  directoryHandler: (target: Folder) => void;
}

class Finder extends React.Component<FinderProps> {
  render() {
    return (
      <Segment basic={true} style={{ margin: 0, height: 560 }}>
        <Grid columns={4}>
          {this.props.currentDirectory.children.map(
            entity => (
              <Grid.Column style={{ textAlign: 'center' }}>
                <EntityUnit entity={entity} directoryHandler={this.props.directoryHandler}/>
              </Grid.Column>
            )
          )}
        </Grid>
      </Segment>
    );
  }
}

export default Finder;
