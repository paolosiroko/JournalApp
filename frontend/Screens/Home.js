import React, {useState,useEffect, Component } from 'react'
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import {Card, FAB} from 'react-native-paper'
import {API_URL} from './Utils/utils'



function Home(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData =() => {

    fetch(API_URL + 'entries',{
      method:'GET'
    })

    .then(resp => resp.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })

    .catch(error => Alert.alert("Error", error))

  }


  useEffect(()=>{
    loadData();

  },[])

  const clickedItem = (data) => {
    props.navigation.navigate("JournalDetails", {data:data})
  }

  const trimContent = (content) => {
    const words = content.split(' ');
    if (words.length > 50) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return content;
  };

  const renderData = (item) => {
    return(
      <Card style = {styles.cardStyle} onPress = {() => clickedItem(item)}>
        <Text style = {styles.textStyle} >{item.title}</Text>
        <Text style = {styles.descStyle} >{trimContent(item.content)}</Text>
      </Card>
    )
  }

    return (
      <View style = {{flex:1}}>
         
          <FlatList
          data = {data}
          renderItem =  {({item}) =>{
            return renderData(item)
          }}
          onRefresh = {() => loadData()}
          refreshing = {loading}
          keyExtractor = {item => `${item.id}`}          
          />

          <FAB
          style = {styles.fab}
          small = {false}
          icon = "plus"
          theme = {{colors:{accent:'grey'}}}

          onPress = {() => props.navigation.navigate("Create")}
          />
         
        </View>        
    );
}


const styles = StyleSheet.create({
  cardStyle: {
    padding:10,
    margin:10
  },

  textStyle :{
    fontSize:25,
    fontWeight: 'bold',
    color:'#000'
  },

  descStyle :{
    fontSize: 16,
    lineHeight: 24,
  },
  fab:{
    position:'absolute',
    margin:16,
    right:0,
    bottom:0,
    backgroundColor:'grey',

  }
  
});

export default Home

