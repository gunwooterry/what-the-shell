import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import Header from '../components/Header';
import GUIWindow from '../components/GUIWindow';
import CommandList from '../components/CommandList';
import Shell from '../components/Shell';

const noPadding = {
  padding: 0,
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isGuiSelected: true,
    };
  }

  render() {
    return (
      <div style={{ overflowX: 'scroll', minHeight: 1000 }}>
        <Header />
        <Container style={{ marginTop: 54, marginBottom: 54, height: 600 }}>
          <Grid style={{ width: 1200 }}>
            <Grid.Column width={8} style={noPadding}>
              <GUIWindow emphasized={this.state.isGuiSelected} />
            </Grid.Column>
            <Grid.Column width={1} style={noPadding}></Grid.Column>
            <Grid.Column width={7} style={noPadding}>
              <div style={{ height: 28, textAlign: 'right' }}>
                <a>Clear History</a>
              </div>
              <CommandList />
              <Shell emphasized={!this.state.isGuiSelected} />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
