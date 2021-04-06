import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
export default class IssueScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      buttonState: 'normal',
      scannedData: '',
      bookId: '',
      studentId: ''
    }
  }
  cameraPermission() {
    const { status } = Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    })
  }
  handledBarcodeScanned = ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }
  render() {
    if (this.state.buttonState === "clicked" && this.state.hasCameraPermissions === true) {
      return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handledBarcodeScanned}></BarCodeScanner>
      )
    }
    else if (this.state.buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View style={styles.viewContainer}>
            <TextInput style={styles.inputBox} placeholder="studentId" onChangeText={(text) => { this.setState({ studentId: text }) }}></TextInput>
            <TouchableOpacity style={styles.button} onPress={this.cameraPermission}><Text>Scan</Text></TouchableOpacity>
          </View>
          <View style={styles.viewContainer}>
            <TextInput style={styles.inputBox} placeholder="bookId" onChangeText={(text) => { this.setState({ bookId: text }) }}></TextInput>
            <TouchableOpacity style={styles.button}><Text>Scan</Text></TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  viewContainer:{
flexDirection:"row",
marginTop:50
  },
  inputBox: {
    borderWidth: 2,
    width: 200,
    height: 50
  },
  container: { alignItems: "center", justifyContent: "center" },
  button: { width: 80, height: 50, backgroundColor: "lightgreen", borderWidth: 2, alignItems: "center", justifyContent: "center" }
})