import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Switch,
  StyleSheet,
  ListView,
} from 'react-native'
import { find } from 'lodash'
import Toolbar from '../components/Toolbar'
import HighlightButton from '../components/HighlightButton'

// Always use const when possible
const initialTodos = [
  {
    id: 1,
    name: 'Create my first mobile app',
    description: 'Create a RN app to learn :)',
    done: true,
  },
  {
    id: 2,
    name: 'Goals for 2017',
    description: 'Develop amazing mobile apps, working on 12 minutes :)',
    done: false,
  }
]

export default class TodoListScene extends Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (
      r1.name !== r2.name || r1.description !== r2.description || r1.done !== r2.done
    )})
    // When I create or edit todos, I send it through the route, and pass as props again
    // to the scene, that's why in the first load it should use the const initialTodos
    this.state = {
      todos: props.todos || initialTodos,
      dataSource: ds.cloneWithRows(props.todos || initialTodos)
    }
  }

  // map currentTodos to change done flag
  handleToggleDone = (todo, done) => {
    const todos = this.state.todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          done
        }
      }
      return currentTodo
    })
    this.setState({
      todos,
      dataSource: this.state.dataSource.cloneWithRows(todos)
    })
  }

  //navigates to detail scene with an empty todo
  handleChangeToAdd = () => {
    this.props.navigator.push({
      id: 'detail',
      todo: {
        id: this.state.todos.length + 1,
        name: '',
        description: ''
      },
      onSave: this.handleSave
    })
  }

  // handles create or update todo
  handleSave = (editedTodo) => {
    let todos
    if (find(this.state.todos, todo => todo.id === editedTodo.id)) {
      todos = this.state.todos.map(todo => {
        if (todo.id === editedTodo.id) {
          return editedTodo
        }
        return todo
      })
    } else {
      todos = [
        ...this.state.todos,
        editedTodo,
      ]
    }
    // this was the way I found to pass todos back to the TodoList. I'm sure this
    // is not the best way, but for test purposes it works
    this.props.navigator.push({ id: 'list', todos })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar title="Todo list" />
        <View style={{ backgroundColor: '#ebeef0', flex: 1 }}>
          <ListView
            style={{ flex: 1 }}
            dataSource={this.state.dataSource}
            renderRow={(todo) => (
              <View style={StyleSheet.flatten([styles.row, todo.done && styles.rowDone])}>
                <Switch
                  style={styles.switch}
                  onValueChange={(value) => this.handleToggleDone(todo, value)}
                  value={todo.done}
                />
                <TouchableHighlight
                  onPress={() => {
                    this.props.navigator.push({
                      id: 'detail',
                      todo,
                      onSave:this.handleSave
                    })
                  }}
                >
                  <Text style={StyleSheet.flatten([styles.todoLabel, todo.done && styles.done])}>
                    {todo.name}
                  </Text>
                </TouchableHighlight>
              </View>
            )}
          />
          <HighlightButton onClick={this.handleChangeToAdd}>
            New todo
          </HighlightButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  rowDone: {
    backgroundColor: '#ccc',
  },
  todoLabel: {
    flex: 1,
  },
  switch: {
    width: 50,
    alignSelf: 'flex-start',
  },
  done: {
    textDecorationLine: 'line-through'
  }
})
