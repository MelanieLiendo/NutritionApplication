import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ScrollView, Modal, Alert, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveWeek from './SaveWeek';

import { Dimensions } from 'react-native';

// get width and height in pixels for the current device
// const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)

export default function App() {

  const styles={
  safeArea: {
    flex: 1,
    height:windowHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  safeAreaShadow: {
    flex: 1,
    alignItems: 'center',
    opacity: 0.1,
  },

  green: {
    color: 'green'
  },

  red: {
    color: 'red'
  },

  title: {
    marginBottom: 10,
    fontWeight: 100,
    fontSize: 50,
    letterSpacing: 20,
    textAlign: 'center',
    height:windowHeight>750?windowHeight*.2:windowHeight*.1
  },

  picker:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,

  },

  weekDays: {
    fontWeight: 200,
  },

  grid: {
    flex: 0,  
    flexDirection: 'row',
    height:400,
    height:windowHeight>750? windowHeight*.5: windowHeight*.6
  },

  mealColumns: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 20,
    gap: 20,
    
  },

  dayColumns: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 25,
    gap: 37,
  },

  dayColumns2: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 23,
    gap:35,
  },

  dayColumns0: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 23,
    gap:35,
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
    // marginTop: 22,
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
    width: 40,
    padding: 13,
    marginBottom: 3,
    elevation: 2,
  },

  buttonOpen: {
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',
    borderWidth: 1,

  },

  buttonOpenGood: {
    backgroundColor: '#CAD473',
    borderColor: '#CAD473',
    borderWidth: 1,
  },

  buttonOpenBad: {
    backgroundColor: '#D42500',
    borderColor: '#D42500',
    borderWidth: 1,
  },

  buttonClose: {
    backgroundColor: 'black',
    width: 80,
    
  },

  textStyle: {
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

  buttonCloseModalColors: {
    borderRadius: 100,
    width: 100,
    padding: 13,
    marginBottom: 20,
    elevation: 2,

  },


  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  infoTextContainer: {
    marginTop: 20,
    marginBottom: 20,
    flex:1,
    height:windowHeight*.15
  },

  


  infoText1: {
    // marginBottom: 20,
    textAlign: 'center',
    fontWeight: 700,
    height:windowHeight*.03
  },


  saveOrClear: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 60,
    gap: 10,
    height:windowHeight*.05

  },

  clearOut: {
    backgroundColor: '#DADADA',
    padding: 10,
    borderRadius: 20,
    height: 35,

  },

  mapWeeks: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderBottomWidth: 1,
    gap: 40,
    padding: 15,

  },

  mapWeeksInfo: {
    marginLeft: 10,
    gap: 3,
  },

  modalVisibleButton: {
    display: 'flex',
    padding: 40,
    gap: 10,
    marginBottom: 10,
    marginTop: 30,
  },

  modalVisibleButton1: {
    backgroundColor: '#CAD473',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center'

  },

  modalVisibleButton2: {
    backgroundColor: '#D42500',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center'

  },

  modalVisibleButton3: {
    backgroundColor: '#dadada',
    borderRadius: 20,
    padding:15,
    alignItems: 'center'

  },

  modalMap: {
    backgroundColor: '#EE81F0',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    gap: 20,
    shadowOpacity: 70,
    shadowRadius: 6,
    elevation: 5,
    maxHeight: 500,

  },

  deleteWeekButton : {
    backgroundColor: '#EE81F0',
    elevation: 2,
    justifyContent: 'center',
    paddingLeft:3,
    paddingRight: 3,
    borderRadius: 30,
    borderColor: 'black',
  },

  deleteWeekText: {
    color: 'black',
    textDecorationLine: 'underline',
  },

  totalsMaped: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },

  initialDate: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  importantText: {
    fontWeight: 700,
  },

  messageSaveWeek: {
    color: 'green',
    height:windowHeight*.03
  }
}
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHistoric, setModalHistoric] = useState(false);
  const [modalSaveOpen, setModalSaveOpen] = useState(false);  
  const [day, setDay] = useState(null)
  const [meal, setMeal]= useState( null)
  const [messageSaveWeek, setMessageSaveWeek] = useState("")
  const [pickerDay, setPickerDay] = useState(1)
  const [pickerMonth, setPickerMonth] = useState(1)
  const [countHealthy, setCountHealthy] = useState(0)
  const [countUnhealthy, setCountUnhealthy]= useState(0)
  const [goodMeals, setGoodMeals] = useState("")
  const [badMeals, setBadMeals] = useState("")
  const [reducedMeals, setReducedMeals] =useState(0)
  const [reducedHealthy, setReducedHealthy] = useState(0)
  const [arrWeeks, setArrWeeks] =useState([])
  const allWeek =["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const [week, setWeek] = useState({
    monday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    tuesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    wednesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    thursday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    friday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    saturday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    sunday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
  })


  
 const _storeData = async (week) => {
    try {
      await AsyncStorage.setItem("week", JSON.stringify(week));
    } catch (error) {
      // Error saving data
    }
  };

  const _storeHistorical = async (arrWeeks) => {
    try {
      await AsyncStorage.setItem("historical", JSON.stringify(arrWeeks));
    } catch (error) {
      // Error saving data
    }
  }

  useEffect(() =>{
    
 const _retrieveData = async () => {
    try {

      const data = await AsyncStorage.getItem('week');
   
      if (data !== null) {   
        let dataJson= JSON.parse(data)
        setWeek(dataJson)
        // We have data!!
        console.log(dataJson);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _retrieveHistorical = async () => {
    try {

      const data = await AsyncStorage.getItem('historical');
   
      if (data !== null) {   
        let dataJson= JSON.parse(data)
        setArrWeeks(dataJson)
        // We have data!!
        console.log(dataJson);
      }
    } catch (error) {
      // Error retrieving data
    }

  }

  _retrieveData()
  _retrieveHistorical()
  },[])


  const handleColor = (day, name) => {

    setModalVisible(true)

    if (name == "breakfast"){
      setDay(day.days)
      setMeal(name)    
    }  else if (name == "lunch"){
      setDay(day.days)
      setMeal(name)
    } else if (name == "teatime"){
      setDay(day.days)
      setMeal(name)
    }else if (name == "dinner"){
      setDay(day.days)
      setMeal(name)
    }

  } 

  const manageMeal = (healthy)=> {
    let temp = {...week}
    temp[day][meal] = healthy
    setWeek(temp)
    _storeData(temp)
    setModalVisible(false)

     
  }


  useEffect(() => {

    var countH = 0
    var countU = 0
    
    const handleHealthy = () => {
    for (var day in week){  
      for (var meal in week[day]){  
        if (week[day][meal] === "healthy"){
           countH++
        } else if (week[day][meal] === "not healthy" ){
          countU++

        }

      }
    }
  }

  const handlePorcentajes = ( ) => {
    var takenMeals = countH + countU
    if (countH != 0){
      var good =  (countH*100)/takenMeals
    } else {
      var good =  0
    }  
    setGoodMeals(Math.round(good))
    if (takenMeals != 0) {
    setBadMeals(100 - Math.round(good))
    } else {
      setBadMeals(0)
    }
    setCountHealthy(countH)
    setCountUnhealthy(countU)
  }

  
  handleHealthy()
  handlePorcentajes()
  },[week])




  const alert =() => {
    Alert.alert(
      'Clear out week',
      'Currents week information will reset',
      [
      {text: 'OK', onPress: () => clearWeek()},
      {text: 'Cancel'},      
      ],
      { cancelable: false }
      )
  }

  const alertHistoric =(index) => {

    Alert.alert(
      'Week would be deleted',
      'Are you sure you want to delete this week?',

      [
      {text: 'OK', onPress: () =>  handleDeleteWeek(index)},
      {text: 'Cancel'},      
      ],
      { cancelable: false }
      )
  }

  

  const clearWeek = async() =>{
    
      try {
          await AsyncStorage.removeItem('week');
          setWeek({
            monday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            tuesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            wednesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            thursday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            friday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            saturday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
            sunday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
          })
      }
      catch(exception) {
 
      }
  }

  const historic = ( ) =>{
    setModalHistoric(true)

  }

  const handleDeleteWeek = (index) => {
    let temp = [...arrWeeks]
    temp.splice(index, 1)
    setArrWeeks(temp)
    _storeHistorical(temp)
   
  }

  useEffect(()=>{
    triggerReduce()
  },[arrWeeks])

  const triggerReduce = () => {
    let reducedMeals = arrWeeks.reduce((takenMeals,acc)=>(takenMeals +(acc.takenMeals)),0)
    let reducedHealthy = arrWeeks.reduce((totalHealthy,acc)=>(totalHealthy +(acc.healthy)),0)
    setReducedHealthy(reducedHealthy)
    setReducedMeals(reducedMeals)
  }

  

  return (
    <SafeAreaView style={(modalVisible || modalSaveOpen || modalHistoric) ? styles.safeAreaShadow :styles.safeArea}>
          <Text style={styles.title}>{windowHeight<750 ?`80/20`: windowHeight> 850? `80/20\nTRACKER`:`80/20\nWEEK\n TRACKER`}</Text>

          
          
          <View style={styles.grid}> 
          <View style= {styles.eachColumn}>
             <Text> </Text>
              <View style={windowHeight< 750? styles.dayColumns0: windowHeight> 850? styles.dayColumns2: styles.dayColumns}>
                {allWeek.map((days, index)=>(
                  <Text key={index} style = {styles.weekDays}>{days.toUpperCase()}</Text>
                ))}
              </View>                           
            </View>                  
           <View style= {styles.eachColumn}>
             <Text>BREAKFAST  </Text>
              <View style={ styles.mealColumns}>
                {allWeek.map((days, index)=>(
                  <Pressable key={index} style = {week[days]["breakfast"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["breakfast"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] }  onPress={()=> handleColor({days}, "breakfast")}></Pressable>
                ))}
              </View>                           
            </View>
            <View style= {styles.eachColumn}>
              <Text>LUNCH  </Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days, index)=>(
                  <Pressable  key={index} style = {week[days]["lunch"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["lunch"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "lunch")}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>TEA TIME  </Text>
              <View style={styles.mealColumns}>  
              {allWeek.map((days, index)=>(
                  <Pressable key={index} style = {week[days]["teatime"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["teatime"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "teatime")}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>DINNER</Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days, index)=>(
                  <Pressable key={index} style = {week[days]["dinner"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["dinner"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "dinner")}></Pressable>
                ))}
              </View>
            </View>   
          </View>
          


      <View style= {styles.infoTextContainer}>
        <Text style= {styles.infoText1}>Healthy Meals: {goodMeals}% </Text>
        <Text style= {styles.infoText1}>Unhealthy Meals:{badMeals}% </Text>
        <Text style= {styles.messageSaveWeek}>{messageSaveWeek}</Text>
      </View>  

      <View style= {styles.saveOrClear}>
        <Pressable style = {styles.clearOut} onPress={() => alert()}><Text>Clear week</Text></Pressable>              
        <SaveWeek  pickerDay = {pickerDay} setPickerDay= {setPickerDay} pickerMonth= {pickerMonth} setPickerMonth= {setPickerMonth} setMessageSaveWeek= {setMessageSaveWeek} arrWeeks={arrWeeks} setArrWeeks={setArrWeeks} countHealthy={countHealthy} countUnhealthy={countUnhealthy} setCountHealthy={setCountHealthy} setCountUnhealthy={setCountUnhealthy} clearWeek={clearWeek} _storeHistorical={_storeHistorical} setModalSaveOpen={setModalSaveOpen} setReducedHealthy={setReducedHealthy} setReducedMeals={setReducedMeals}/>
        <Pressable style = {styles.clearOut} onPress={() => historic()}><Text>Statistics</Text></Pressable>
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
            <View style= {styles.modalVisibleButton}>
            <Pressable style = {styles.modalVisibleButton1} onPress={() => manageMeal("healthy")}><Text>Healthy</Text></Pressable>
            <Pressable style = {styles.modalVisibleButton3} onPress={() => manageMeal("")}><Text>Return to initial value</Text></Pressable>
            <Pressable style = {styles.modalVisibleButton2} onPress={() => manageMeal("not healthy")}><Text>Not Healthy</Text></Pressable>
            </View>
            <Pressable
              style={[styles.buttonCloseModalColors, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>x Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalHistoric}
        onRequestClose={() => {
          setModalHistoric(!modalHistoric);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalMap}>
            <ScrollView>
            {arrWeeks.map((week, index) =>(
              <View style={styles.initialDate} key={index}>
                <Text style={styles.importantText}>Week: {week.dates}</Text>
              <View style={styles.mapWeeks}>
                <View style={styles.mapWeeksInfo}>              
              <Text>Healthy meals:  {week.healthy} <Text style={styles.green}> ({week.takenMeals != 0 ? Math.round(week.healthy*100/(week.takenMeals)): 0}%)</Text></Text>
              <Text>Unhealthy meals:  {week.unhealthy} <Text style={styles.red}>({week.takenMeals != 0 ? Math.round(week.unhealthy*100/(week.takenMeals)): 0}%)</Text> </Text>
              <Text>Total meals:  {week.unhealthy + week.healthy} </Text>
                </View>
              <Pressable style={styles.deleteWeekButton} onPress={()=>alertHistoric(index)}>
                <Text style= {styles.deleteWeekText}>Delete Week</Text>
                </Pressable>
              </View>
              </View>
            ) )}
            </ScrollView>

              <View style={styles.totalsMaped}>
            <Text>HEALTHY MEALS: {reducedMeals != 0 ? Math.round((reducedHealthy*100/reducedMeals)) : 0}%</Text>
            <Text>UNHEALTHY MEALS: {reducedMeals != 0 ? Math.round(((reducedMeals - reducedHealthy)*100/reducedMeals)) : 0}%</Text>
              </View>
            
            
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => setModalHistoric(!modalHistoric)}>
              <Text style={styles.textStyle}>x Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

  
 
    </SafeAreaView>
  )
}

  