/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry, Text, Navigator
} from 'react-native';
import TodoListScene from './src/scenes/TodoListScene'
import TodoDetailScene from './src/scenes/TodoDetailScene'

const routes = [
  {id: 'list'},
  {id: 'detail'},
]

export default class todoApp extends Component {
  // I don't know yet if this is the best way of handling routes
  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'list':
        return (
          <TodoListScene
            navigator={navigator}
            title="Todo List"
            todos={route.todos}
          />
        )
      case 'detail':
        // onSave was passed as props because it's handled by ListScene
        // (I know this must not be the ideal, it's only for tests purposes for now)
        return (
          <TodoDetailScene
            navigator={navigator}
            title="Todo Detail"
            todo={route.todo}
            onSave={route.onSave}
          />
        )
      default:
        return <Text>No page found</Text>
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.navigatorRenderScene}
      />
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
