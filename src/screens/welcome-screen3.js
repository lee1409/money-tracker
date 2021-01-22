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
            

            <Image source={require("../assets/guide.gif")}
            style={styles.img}/>
            
            <Text style={styles.title}>Add your recurring events and</Text>
            <Text style={styles.title}>Record your expense with</Text>
            <Text style={styles.title}>a single swipe</Text>

            <TouchableOpacity onPress={() => navigation.goBack()} 
                                style={styles.appButtonContainer2}>
                <Text style={styles.appButtonText2}     
                        >{" <<"} Back </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.push('Login')}
                                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}     
                        >start {" >>"}</Text>
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
      backgroundColor: "#72C4A6",
    },
  
    title: {
      fontSize: 20,
      marginTop: 5,
      marginLeft:20,
      marginRight:20,
      justifyContent: "center",
      alignItems: "center",
      textAlign:"center",
      color: "#fff",
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
        color: "#717171",
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
        marginBottom:10,
        width: 230,
        height: 400,
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