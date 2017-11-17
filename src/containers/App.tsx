import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import Header from '../components/Header';
import GUIWindow from '../components/GUIWindow';
import CommandList from '../components/CommandList';
import Shell from '../components/Shell';

interface AppProps {
}

interface AppStates {
  isGuiSelected: boolean;
}

const noPadding = {
  padding: 0,
};

class App extends React.Component<AppProps, AppStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isGuiSelected: true,
    };
    this.modeToGui = this.modeToGui.bind(this);
    this.modeToCli = this.modeToCli.bind(this);
  }

  toggleMode(e: Event) {
    this.setState({ isGuiSelected: !this.state.isGuiSelected });
  }

  modeToGui(e: Event) {
    this.setState({ isGuiSelected: true });
  }

  modeToCli(e: Event) {
    this.setState({ isGuiSelected: false });
  }

  render() {
    return (
      <div style={{ overflowX: 'scroll', minHeight: 1000 }}>
        <Header/>
        <Container style={{ marginTop: 54, marginBottom: 54, height: 600 }}>
          <Grid style={{ width: 1200 }}>
            <Grid.Column width={8} style={noPadding}>
              <GUIWindow
                emphasized={this.state.isGuiSelected}
                modeHandler={this.modeToGui}
              />
            </Grid.Column>
            <Grid.Column width={1} style={noPadding}>
            </Grid.Column>
            <Grid.Column width={7} style={noPadding}>
              <div style={{ height: 28, textAlign: 'right' }}>
                <a>Clear History</a>
              </div>
              <CommandList/>
              <Shell
                emphasized={!this.state.isGuiSelected}
                modeHandler={this.modeToCli}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
