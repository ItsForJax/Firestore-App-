import { Pressable, SafeAreaView, StyleSheet, Text, View, StatusBar, TextInput, FlatList, ActivityIndicator } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import ShoppingItem from './components/ShoppingItem';
import { useState, useEffect } from 'react';
import {doc,db,getFirestore,collection,addDoc,getDocs, deleteDoc} from "./firebase/index";
const statusBarHeight = StatusBar.currentHeight || 0;

export default function App() {

  StatusBar.setHidden(false); //Hides the statusbar of android the bar with time, wifi, and other stuff

  const [title, setTitle] = useState("");
  const [itemCounter, setItemCounter] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);

  //Adding Data
  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "Shopping"), {
        title: title,
        isChecked: false
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      getShoppingList();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //Getting all the Data
  const getShoppingList = async() => {
    const querySnapshot = await getDocs(collection(db, "Shopping"));
    setShoppingList(
      querySnapshot.docs.map((doc)=>({
        ...doc.data(), id: doc.id
      }))
    )
  }

  //Delete All
  const deleteShoppingList = async ()=>{
    const querySnapshot = await getDocs(collection(db, "Shopping"));
    querySnapshot.docs.map((item)=> deleteDoc(doc(db, 'Shopping', item.id)))
    getShoppingList();
  }

  useEffect(()=> {
    getShoppingList();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
       <Text style={styles.textHeader}>SHOPPING LIST</Text> 
       <Text style={{...styles.textHeader, flex: 0, marginEnd: 20}}>{shoppingList.length}</Text> 
       <Pressable onPress={deleteShoppingList}>
        <MaterialIcons name='delete' size={30} color={'red'}/> 
       </Pressable>
      </View>

      {
        shoppingList.length > 0 ?
      <FlatList 
      data={shoppingList}
      renderItem={({item})=>
        <ShoppingItem 
        title={item.title} 
        isChecked={item.isChecked} 
        id={item.id}
        getShoppingList={getShoppingList}/>}
      keyExtractor={item=>item.id}
      contentContainerStyle={styles.list}
      /> 
      : <ActivityIndicator/>
      }

      <TextInput placeholder='Enter Item' style={styles.input}
      selectionColor={'#352F44'}
      value={title}
      onChangeText={(text) => setTitle(text)}
      onSubmitEditing={addShoppingItem}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
  },
  textHeader: {
    includeFontPadding: false,
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    color: '#352F44'
  },
  header: {
    marginTop: statusBarHeight + 5,
    marginBottom: 10,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#B9B4C7',
    flexDirection: 'row',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    width: '95%',
    marginTop: 'auto',
    color: '#352F44',
    fontSize: 15
  },
  list: {
    width: '100%',
    alignItems: 'center'
  }
});
