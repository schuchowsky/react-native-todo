import React, { Component, PropTypes } from 'react'
import { Button } from 'react-native'

// Example using children - and this buttons repeats in both scenes
export default class HighlightButton extends Component {
  render() {
    return (
      <Button
        onPress={this.props.onClick}
        title={this.props.children}
        color="#841584"
      />
    )
  }
}

HighlightButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
