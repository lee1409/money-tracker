import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";



export default function LoginScreen({ navigation }) {

    return(

        <View style={styles.container}>
            

            <Image source={require("../assets/ww.png")}
            style={styles.img}/>

            <Text style={styles.title}>Hi There!</Text>
            <Text style={styles.title2}>Welcome to Budget Tracker !</Text>

            <TouchableOpacity onPress={() => navigation.push('Welcome2')}
                                style={styles.appButtonContainer}
                                >
                <Text style={styles.appButtonText}     
                        >Next {" >>"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push('Login')}
                                style={styles.appButtonContainer3}>
                <Text style={styles.appButtonText3}     
                        >Skip {" >>"}</Text>
            </TouchableOpacity>
        </View>
    );

    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "#EF7971",
    },
  
    title: {
      fontSize: 30,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      alignSelf: "center",
    },

    title2: {
        fontSize: 20,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        alignSelf: "center",
      },

    appButtonContainer: {
        // elevation: 8,
        // backgroundColor: "#009688",
        // borderRadius: 10,
        // paddingVertical: 10,
        // paddingHorizontal: 12,
        position: 'absolute', 
        bottom: 30, 
        right: 30,
      },

      appButtonText: {

        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },

      img:{
        marginBottom:20,
        width: 300,
        height: 300,
        resizeMode: 'stretch',
      },

      appButtonContainer3: {
        position: 'absolute', 
        top: 40, 
        right: 20,
      },

      appButtonText3: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },

});