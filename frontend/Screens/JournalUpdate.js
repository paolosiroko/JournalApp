import React, {useState} from 'react'
import {Alert,StyleSheet, Text, View,ScrollView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {API_URL} from './Utils/utils'


function JournalUpdate(props) {

  const data = props.route.params.data;
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.content)
  const [category, setCategory] = useState(data.category)

  const updateData = () => {

    fetch(API_URL + `entries/${data.id}/`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({title:title,content,category})
    })

    .then(resp => resp.json())
    .then(data => {
      props.navigation.navigate("Home", {data:data})
    })

    .catch(error => Alert.alert("Error", error))

  }
 
  return (
    <ScrollView >
    <View>

    <TextInput style = {styles.inputStyle}
    label = "Title"
    value = {title}
    mode = 'outlined'

    onChangeText = {text => setTitle(text)}
    />

   <TextInput style = {styles.inputStyle}
    label = "content"
    value = {content}
    mode = 'outlined'
    multiline
    numberOfLines = {10}
    onChangeText = {text => setContent(text)}
    />

   <TextInput style = {styles.inputStyle}
    label = "category"
    value = {category}
    mode = 'outlined'

    onChangeText = {text => setCategory(text)}
    />

    <Button style = {{margin:10,}}
    icon ="update"
    mode = "contained"
    onPress = {() => updateData()}
    >
     Update Journal
    </Button>

 </View>
 </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    padding:10,
    marginTop:30,
    margin:10
  },

  
});

export default JournalUpdate