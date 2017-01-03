import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native'
import Toolbar from '../components/Toolbar'
import HighlightButton from '../components/HighlightButton'

export default class TodoDetailScene extends Component {
  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      todo: props.todo || { id: 0, name: '', description: ''}
    }
  }

  handleTextChange = (prop, text) => {
    this.setState({
      todo: {
        ...this.state.todo,
        [prop]: text,
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          title={this.props.title}
          onBackClick={() => this.props.navigator.pop()}
        />
        <Text>Name:</Text>
        <TextInput
          onChangeText={(text) => this.handleTextChange('name', text)}
          value={this.state.todo.name}
        />
        <Text>Description:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={(text) => this.handleTextChange('description', text)}
          value={this.state.todo.description}
        />
        <HighlightButton onClick={() => this.props.onSave(this.state.todo)}>
          Save
        </HighlightButton>
      </View>
    )
  }
}

TodoDetailScene.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })
}
