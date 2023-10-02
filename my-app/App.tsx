import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/home.page'
import DatabaseInit from './src/database/db-init';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    new DatabaseInit
    console.log("initialize database")
  }


  render() {
    return (
      <Home />
    );
  }
}