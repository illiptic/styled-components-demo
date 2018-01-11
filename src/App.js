import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import themes from './themes'
import Wrapper from './components/Wrapper.js'
import HeaderContainer from './components/header/HeaderContainer.js'
import SidebarContainer from './components/SidebarContainer.js'
import TilesContainer from './components/TilesContainer.js'
import Recipes from './components/recipes/Recipes.js'


class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      currentTheme: 'default'
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
          <HeaderContainer theme={currentTheme} setTheme={this.setTheme.bind(this)} />
          {/* <SidebarContainer theme={currentTheme} setTheme={this.setTheme.bind(this)}/> */}
          <Recipes />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App;
