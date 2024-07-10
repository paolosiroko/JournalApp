import React from 'react'
import {Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import {Button, Card} from 'react-native-paper'
import {API_URL} from './Utils/utils'

function JournalDetails(props) {
  const data = props.route.params.data;

  const deletedData = (data) => {
    fetch(API_URL + `entries/${data.id}/`,{
      method:'DELETE',
      headers:{
        'Content-type':'application/json'
      }
    })

    .then(data => {
      props.navigation.navigate("Home")
    })

    .catch(error => Alert.alert("Error", error))

  }

  return (
    <ScrollView>
    <View style = {styles.viewStyle}>
          <Text style = {{fontSize:30,fontWeight: 'bold',}}>
              {data.title}
          </Text>
          <Text style = {{fontSize:20,margin:10,}}>
              {data.content}
          </Text>
          <Text style = {{fontSize:15,margin:10,}}>
             Category : {data.category}
            </Text>
          <Text style = {{fontSize:15,margin:10,}}>
              Date created : {data.date}
            </Text>
       
        <View style = {styles.btnStyle}>
        <Button
         icon = "update"
         mode = "contained"
         onPress = {() => props.navigation.navigate("JournalUpdate", {data:data})}
        >
          Edit
        </Button>

        <Button
        icon = "delete"
        mode = "contained"
        onPress = {() => deletedData(data)}
        >
          delete
        </Button>

        </View>
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    padding:20,
    margin:10
  },

  btnStyle:{
    flexDirection:'row',
    justifyContent:'space-around',
    margin:15,
    padding:10,
    marginTop:5

  }

  
});


export default JournalDetails