import * as React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import './App.css';

import Header from '../components/Header';
import GUIWindow from '../components/GUIWindow';
import CommandList from '../components/CommandList';
import Shell from '../components/Shell';
import Arrows from '../components/Arrows';
import { Folder } from './Entity';
import { root } from './Directories';

interface AppProps {
}

interface AppStates {
  isGuiSelected: boolean;
  currentDirectory: Folder;
}

const noPadding = {
  padding: 0,
};

class App extends React.Component<AppProps, AppStates> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isGuiSelected: true,
      currentDirectory: root,
    };
    this.toggleMode = this.toggleMode.bind(this);
    this.modeToGui = this.modeToGui.bind(this);
    this.modeToCli = this.modeToCli.bind(this);
    this.changeDirectory = this.changeDirectory.bind(this);
  }

  toggleMode() {
    this.setState({ isGuiSelected: !this.state.isGuiSelected });
  }

  modeToGui() {
    this.setState({ isGuiSelected: true });
  }

  modeToCli() {
    this.setState({ isGuiSelected: false });
  }

  changeDirectory(target: Folder) {
    this.setState({ currentDirectory: target });
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
                currentDirectory={this.state.currentDirectory}
                modeHandler={this.modeToGui}
                directoryHandler={this.changeDirectory}
              />
            </Grid.Column>
            <Grid.Column width={1} verticalAlign="middle" style={noPadding}>
              <Arrows
                isGuiSelected={this.state.isGuiSelected}
                modeHandler={this.toggleMode}
              />
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
