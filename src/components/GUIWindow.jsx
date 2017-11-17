import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

class GUIWindow extends Component {
  render() {
    return (
      <Segment
        style={Object.assign(windowStyle, this.props.emphasized && emphasizedStyle)}
      >
        <Grid celled="internally">
          <Grid.Column width={4} style={noPadding}>
            <Segment basic />
          </Grid.Column>
          <Grid.Column width={12} style={noPadding}>
            <Segment basic style={{ margin: 0, height: 36 }} />
            <Segment basic style={{ margin: 0, height: 560 }} />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

GUIWindow.propTypes = {
  emphasized: PropTypes.bool.isRequired,
};

export default GUIWindow;
