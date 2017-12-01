import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import themes from './themes'
import Wrapper from './components/Wrapper.js'
import ThemeSelectorContainer from './components/ThemeSelectorContainer.js'

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
          <h1>Hi</h1>
          <ThemeSelectorContainer onChange={this.setTheme.bind(this)} />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App;
