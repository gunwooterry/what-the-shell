import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

interface GUIWindowProps {
  emphasized: boolean;
  modeHandler: (e: Event) => void;
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
            <Segment basic={true} style={{ margin: 0, height: 36 }}/>
            <Segment basic={true} style={{ margin: 0, height: 560 }}/>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default GUIWindow;
