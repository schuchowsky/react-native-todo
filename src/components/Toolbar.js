import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

export default class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
        {this.props.onBackClick && (
          <TouchableHighlight onPress={this.props.onBackClick}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableHighlight>
        )}
        <Text style={styles.toolbarTitle}>{this.props.title}</Text>
      </View>
    )
  }
}

Toolbar.propTypes = {
  title: PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
}

const styles = StyleSheet.create({
  toolbar:{
    backgroundColor:'#81c04d',
    padding:10,
    flexDirection:'row',
   },
   toolbarButton:{
    width: 50,
    color:'#fff',
    textAlign:'center',
   },
   toolbarTitle:{
    fontSize: 20,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
  },
})
