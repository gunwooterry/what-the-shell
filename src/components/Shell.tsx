import * as React from 'react';
import { Segment } from 'semantic-ui-react';

interface ShellProps {
  emphasized: boolean;
  modeHandler: (e: Event) => void;
}

const shellStyle = {
  border: 0,
  fontFamily: 'monospace',
  fontSize: 18,
  width: '100%',
  height: '100%',
  margin: 'auto',
  paddingLeft: 8,
  paddingRight: 8,
};

const emphasizedStyle = {
  MozBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  WebkitBoxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .4)',
  boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, .24)',
  backgroundColor: '#fcfcfc',
  outline: 'none',
};

class Shell extends React.Component<ShellProps> {
  render() {
    return (
      <Segment
        onClick={this.props.modeHandler}
        style={{ padding: 0, margin: 0, height: 48 }}
      >
        <input
          type="text"
          placeholder={'Type your command here'}
          style={Object.assign({}, shellStyle, this.props.emphasized && emphasizedStyle)}
        />
      </Segment>
    );
  }
}

export default Shell;
