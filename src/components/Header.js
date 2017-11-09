import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const logoStyle = {
  fontWeight: 900,
  fontSize: 18,
};

export default () => (
  <Segment attached>
    <Container style={logoStyle}>
      <span style={{ fontFamily: 'monospace' }}>>_</span>
      <span>What</span>
      <span style={{ fontWeight: 400 }}>The</span>
      <span style={{ color: '#00b0f0' }}>Shell</span>
    </Container>
  </Segment>
);
