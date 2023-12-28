import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {db, doc, updateDoc, deleteDoc } from '../firebase/index.js';


export default function ShoppingItem(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const handleSelect = () => {
    setIsChecked(!isChecked)
  }

  const updateIsChecked = async() => {
    try {
        const shoppingRef = doc(db, "Shopping", props.id)
        await updateDoc(shoppingRef, {
            isChecked: isChecked,
        }); 
    } catch (error) {
        console.log(error)
    }
  };


  const deleteShoppingList = async () => {
    deleteDoc(doc(db, 'Shopping', props.id))
    props.getShoppingList();
    console.log('delete')
  }

  useEffect(()=>{
    updateIsChecked();
  }, [isChecked])

  

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleSelect}>
        {
            isChecked ? <AntDesign name='checkcircle' size={24} color={'#352F44'}/> 
            :
            <AntDesign name='checkcircleo' size={24} color={'#352F44'}/> 
        }
        
      </Pressable>

      <Text style={styles.text}>{props.title}</Text>

      <Pressable onPress={deleteShoppingList}>
        <MaterialIcons name='delete' size={26} color={'#352F44'}/> 
      </Pressable>  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B9B4C7',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    marginBottom: 10
  },
  text: {
    color: '#352F44',
    fontWeight: 'bold',
    fontSize: 23,
    includeFontPadding: false,
    paddingHorizontal: 10,
    flex: 1
  },
});
