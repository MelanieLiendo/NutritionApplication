import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Modal,Pressable} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [week, setWeek] = useState({
    monday: {brea},
    tuesday:"",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  })


  const handlePress = () => {
    setModalVisible(true)
    
  }





  

  

 
  return (
    <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>80/20 WEEK PLANNER {'\n'}</Text>
          
          <View style={styles.grid}>
            <View style={styles.weekDays}>
              <Text style={styles.weekDays}>{'\n'}{'\n'}{'\n'}{'\n'}Sunday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Monday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Tuesday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Wednesday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Thursday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Friday </Text>
              <Text style={styles.weekDays}>{'\n'}{'\n'}Saturday</Text>   
           </View> 
            <View style= {styles.eachColumn}>
              <Text>BREAKFAST  </Text>
              <View style={styles.mealColumns}>
              <Pressable style={[styles.button, styles.buttonOpen]}  onPress={()=> handlePress("Sunday breakfast")}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>LUNCH  </Text>
              <View style={styles.mealColumns}>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>TEA TIME  </Text>
              <View style={styles.mealColumns}>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>DINNER</Text>
              <View style={styles.mealColumns}>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}></Pressable>
              </View>
            </View>        
          </View>


        <View style= {styles.infoTextContainer}>
          <Text style= {styles.infoText1}>You have been choosing healty options X% of the meals this week</Text>
          <Text style= {styles.infoText1}>x% of the meals were not that healthy</Text>
          <View style={styles.buttonMonthYear}>
            <Button title="+ MONTH STADS." style={styles.buttonMonthYear}></Button>
            <Button title="+ YEAR STADS."></Button>
          </View>
        </View>    


          
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style = {styles.notHealthy}><Text>Healthy</Text></Pressable>
            <Pressable style = {styles.notHealthy}><Text>Not Healthy</Text></Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>x Close</Text>
            </Pressable>
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

  title: {
    marginTop: 10,
    fontWeight: 200,
    fontSize: 50,
    letterSpacing: 20,
    textAlign: 'center'
  },

  weekDays: {
    fontWeight: 200,
  },

  grid: {
    flex: 0,  
    flexDirection: 'row',
  },

  mealColumns: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    gap: 14,
    
  },

  eachColumn:{
    alignItems: 'center',
  },

  meals: {
    flex: 1,
    flexDirection: 'row',

  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 100,
    width: 20,
    padding: 13,
    marginBottom: 3,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: '#111111',
  },
  buttonClose: {
    backgroundColor: '#999999',
    width: 30,
    
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  infoTextContainer: {
    marginTop: 80,
  },

  notHealthy: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 3,
    elevation: 3,
    flex: 0.5,
    flexDirection: 'column',
  },

 

  infoText1: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 700,
  },

  buttonMonthYear:{
    flexDirection: 'row',
    justifyContent: 'center',
  }


  
});