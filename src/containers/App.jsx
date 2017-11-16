import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import Header from '../components/Header';
import GUIWindow from '../components/GUIWindow';

const noPadding = {
  padding: 0,
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isGuiEmphasized: true,
    };
  }

  render() {
    return (
      <div style={{ overflowX: 'scroll', minHeight: 1000 }}>
        <Header />
        <Container style={{ marginTop: 54, marginBottom: 54, height: 600 }}>
          <Grid style={{ width: 1200 }}>
            <Grid.Column width={8} style={noPadding}>
              <GUIWindow emphasized={this.state.isGuiEmphasized} />
            </Grid.Column>
            <Grid.Column width={1} style={noPadding}></Grid.Column>
            <Grid.Column width={7} style={noPadding}></Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
