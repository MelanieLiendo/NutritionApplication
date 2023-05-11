import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Modal, Alert, Pressable} from 'react-native';
import { Picker } from '@react-native-picker/picker';

function SaveWeek({setModalSaveOpen, pickerDay, setPickerDay, pickerMonth, setPickerMonth, setMessageSaveWeek , arrWeeks, setArrWeeks, countHealthy, countUnhealthy, setCountHealthy, setCountUnhealthy, clearWeek , _storeHistorical, }) {
    
 const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "25", "26", "27", "28", "29", "30", "31"]
 const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
 const [modalSave, setModalSave] = useState(false);


 const saveKey = () => {
    
    let temp = [...arrWeeks]
    temp.push({"dates": `${pickerDay}/${pickerMonth}`,"healthy": countHealthy, "unhealthy": countUnhealthy, "takenMeals": countHealthy+countUnhealthy})
    setArrWeeks(temp)
    setCountHealthy(0)
    setCountUnhealthy(0)
    setModalSaveOpen(false)
    setMessageSaveWeek("Your week has been saved, check it out on historic weeks!")
    setTimeout(() => {
      setMessageSaveWeek("");
    }, 3000);
    clearWeek()
    _storeHistorical(temp)
    setPickerDay(1)
    setPickerMonth(1)    
  }





  return (
    <SafeAreaView >
    <Pressable style = {styles.clearOut} onPress={() => [setModalSave(true), setModalSaveOpen(true)]}><Text>Save Week</Text></Pressable>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSave}
        onRequestClose={() => {
          setModalSave(!modalSave);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalSave}>
            <View style={styles.pickers}>
              <View style={styles.pickersDayWrapper}>
                <Text>Select Day:</Text>
                <Picker   
                  selectedValue={pickerDay}         
                  itemStyle={{color:'black',width:100}}
                  onValueChange={ (itemValue, itemIndex) => setPickerDay(itemValue)}>
                  {days.map((day)=>(
                  <Picker.Item label={day} value={day} />
                  ))}
               </Picker>
              </View>
              <View style={styles.pickersDayWrapper}>
                <Text>Select Month:</Text>
                <Picker
                  selectedValue={pickerMonth} 
                  itemStyle={{color:'black',width:100}}
                  onValueChange={ (itemValue, itemIndex) => setPickerMonth(itemValue) }>
                  {months.map((month)=>(
                    <Picker.Item label={month} value={month} />
                  ))}
              </Picker>
              </View>
            </View>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => {
                setModalSave(!modalSave);
               saveKey()}}>
              <Text style={styles.textStyleModalSave}>Save</Text>
            </Pressable>       
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={()=> {[setModalSave(!modalSave), setModalSaveOpen(false), setPickerDay(1), setPickerMonth(1)]}}>
              <Text style={styles.textStyleModalSave}>x Close</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
    },
  
    safeAreaShadow: {
      flex: 1,
      alignItems: 'center',
      opacity: 0.1,
    },
  
    picker:{
      display: 'flex',
      flexDirection: 'row',
      marginTop: 40,
  
    },
  
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },

    buttonClose: {
      backgroundColor: 'black',
      width: 80,
      
    },
    
    textStyleModalSave: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    buttonCloseModal: {
      borderRadius: 100,
      width: 100,
      padding: 13,
      marginBottom: 0,
      elevation: 2,
    },
    
    clearOut: {
      backgroundColor: '#DADADA',
      padding: 10,
      borderRadius: 20,
      height: 35,
    },

    modalButtons: {
      gap: 10,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
    }, 
    
    modalSave: {
      backgroundColor: '#EE81F0',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      gap: 20,
      shadowOpacity: 70,
      shadowRadius: 6,
      elevation: 5,
    },
   
    pickers: {
      display: 'flex',
      flexDirection: 'row',
      gap: 30,
    },
  
    pickersDayWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    
  });

export default SaveWeek