import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import themes from './themes'
import Wrapper from './components/Wrapper.js'
import HeaderContainer from './components/HeaderContainer.js'
import SidebarContainer from './components/SidebarContainer.js'


class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      currentTheme: 'light'
    };
  }
  setTheme (theme) {
    this.setState({currentTheme: theme})
  }

  render() {
    let {currentTheme} = this.state

    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <Wrapper>
          <HeaderContainer />
          <SidebarContainer theme={currentTheme} setTheme={this.setTheme.bind(this)}/>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App;
