import { StyleSheet, Button, View, Text, TextInput ,FlatList, TouchableOpacity, Modal } from 'react-native';
import {useState} from 'react';

export default function App() {
  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})


  const onHandlerChangeItem = (text) => setTextItem(text)
  const onHandlerAddItem = () => {
    setItemList(currentItems => [...currentItems, {id: Math.random()*10, value: textItem}])
    setTextItem('')
  }

  const onHandlerDeleteItem = id => {
    setItemList(currentItems => currentItems.filter(item => item.id !== id))
    setItemSelected({})
    setModalVisible(!modalVisible)
  }

  const onHandlerCancelDeleteItem = id => {
    setModalVisible(!modalVisible)
  }

  const onHandlerModal = id => {
    setItemSelected (itemList.find(item => item.id === id))
    setModalVisible(!modalVisible)

  }

  return (
    <View>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Lista de compras</Text>
    </View>
    <View style={styles.screen}>
        <Modal
          animationType='slide'
          transparent={true} 
          visible={modalVisible}
          style = {styles.modalView}
        >
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <Text>
                  Mi modal
                </Text>
              </View>
              <View style={styles.modalMessage}>
                <Text>
                  Estas seguro que deseas borrar?
                </Text>
              </View>
              <View style={styles.modalMessage}>
                <Text style= {styles.modalItem}>
                  {itemSelected.value}
                </Text>
              </View>
              <View style={styles.modalButton}>
                <Button onPress={() => onHandlerDeleteItem(itemSelected.id)} title='Confirmar'/>
                <Button onPress={() => onHandlerCancelDeleteItem()} title='Cancelar'/>
              </View>
            </View>
          </View>
        </Modal>

        


        <View style={styles.container}>
          <TextInput
            placeholder='Escribe aqui' 
            style={styles.input} 
            value={textItem} 
            onChangeText = {onHandlerChangeItem}
          />
          <Button title=' + ' style={styles.button} onPress={() => onHandlerAddItem()} disabled={textItem.length === 0 ? true : false}/>
        </View>
        <FlatList 
          data={itemList} 
          renderItem= {data => (
              <TouchableOpacity onPress={()=> onHandlerModal(data.item.id)} style={styles.item}>
                <View>
                  <Text>{data.item.value}</Text>
                  <Text style={styles.textSmall}>Presiona para eliminar</Text>
                </View>
              </TouchableOpacity>
            )}
          showsVerticalScrollIndicator = {false}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    paddingTop:50,
    paddingBottom: 100
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '10%',
  },
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor:'#222',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: { 
    color: '#fff',
    fontSize: 22,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius:3,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: '10%',
    padding:15,
    height:50,
  },
  modal: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding:'10%',
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalTitle: {
    color: 'white',
    fontSize: '50px',
  },
  modalMessage: {
    marginBottom: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalItem: {
    fontSize:30,
  },
  textSmall: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.2)'
  }
});