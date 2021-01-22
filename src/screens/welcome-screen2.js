import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";

export default function LoginScreen({ navigation }) {

    return(

        <View style={styles.container}>
          
            <Image source={require("../assets/w.png")}
            style={styles.img}/>

            <Text style={styles.title}>Set your budget goals</Text>


            <TouchableOpacity onPress={() => navigation.goBack()} 
                                style={styles.appButtonContainer2}>
                <Text style={styles.appButtonText2}     
                        >{" <<"} Back </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push('Welcome3')}
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
      backgroundColor: "#F0CFA3",
    },
  
    title: {
      fontSize: 25,
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      color: "#717171",
      alignSelf: "center",
    },

    appButtonContainer: {
        position: 'absolute', 
        bottom: 30, 
        right: 20,
      },

      appButtonContainer2: {
        position: 'absolute', 
        bottom: 30, 
        left: 20,
      },

      appButtonText: {
        fontSize: 18,
        color: "#488B80",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },

      appButtonText2: {
        fontSize: 18,
        color: "#EF7971",
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