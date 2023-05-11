import React from 'react'

function SaveWeek(setPickerDay, setPickerMonth, setMessageSaveWeek) {
    


  return (
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
              onPress={() => [setModalSave(!modalSave), saveKey()]}>
              <Text style={styles.textStyleModalSave}>Save</Text>
            </Pressable>       
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => [setModalSave(!modalSave), setPickerDay(1), setPickerMonth(1)]}>
              <Text style={styles.textStyleModalSave}>x Close</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  
  )
}

export default SaveWeek