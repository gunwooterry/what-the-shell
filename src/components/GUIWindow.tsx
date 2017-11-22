import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Folder } from '../containers/Entity';

import Breadcrumb from './Breadcrumb';
import Finder from './Finder';

interface GUIWindowProps {
  emphasized: boolean;
  currentDirectory: Folder;
  modeHandler: () => void;
  directoryHandler: (target: Folder) => void;
}

const windowStyle = {
  marginTop: 0,
  padding: 0,
};

const emphasizedStyle = {
  MozBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  WebkitBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .24)',
  backgroundColor: '#fcfcfc',
};

const noPadding = {
  padding: 0,
};

class GUIWindow extends React.Component<GUIWindowProps> {
  render() {
    return (
      <Segment
        onClick={this.props.modeHandler}
        style={Object.assign({}, windowStyle, this.props.emphasized && emphasizedStyle)}
      >
        <Grid celled="internally">
          <Grid.Column width={4} style={noPadding}>
            <Segment basic={true}/>
          </Grid.Column>
          <Grid.Column width={12} style={noPadding}>
            <Breadcrumb
              currentDirectory={this.props.currentDirectory}
              directoryHandler={this.props.directoryHandler}
            />
            <Finder
              currentDirectory={this.props.currentDirectory}
              directoryHandler={this.props.directoryHandler}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default GUIWindow;
