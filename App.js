import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Modal,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from "react-native-picker-select";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDates, setModalDates] = useState(false)
  const [day, setDay] = useState(null)
  const [meal, setMeal]= useState( null)
  const [numberMeals, setNumberMeals]=useState(0)
  const [countHealthy, setCountHealthy] =useState(0)
  const [countUnhealthy, setCountUnhealthy]=useState(0)
  const [monthCalendar, setMonthCalendar]=useState("")
  const [goodMeals, setGoodMeals] = useState("")
  const [badMeals, setBadMeals] = useState("")
  const [allWeek, setAllWeek] =useState(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
  const [week, setWeek] = useState({
    monday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    tuesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    wednesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    thursday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    friday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    saturday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    sunday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
  })
  const [oneMonth, setOneMonth] = useState({
    firstWeek: {numberMeals: "", countHealthy: "", countUnhealthy: ""}, 
    secondWeek: {},
    thirdWeek: {},
    forthWeek: {},
}) 
  const[months, setMonths]= useState()


  
 const _storeData = async (week) => {
    try {
      await AsyncStorage.setItem("week", JSON.stringify(week));
    } catch (error) {
      // Error saving data
    }
  };



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

  _retrieveData()
  },[])


  const handleBreakfast = (day) => {
    setDay(day.days)
    setMeal("breakfast")
    setModalVisible(true)
  }

  const handleLunch = (day) => {
    setDay(day.days)
    setMeal("lunch")
    setModalVisible(true)
  }

  const handleTeatime = (day) => {
    setDay(day.days)
    setMeal("teatime")
    setModalVisible(true)
  }

  const handleDinner = (day) => {
    setDay(day.days)
    setMeal("dinner")
    setModalVisible(true)
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
   setCountHealthy(countH)
   setCountUnhealthy(countU)
   setNumberMeals(countH + countU)
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
  }

  
  handleHealthy()
  handlePorcentajes()
  },[week])


  const saveWeek = () =>{
    setModalDates(true)

  }

  const clearWeek = () =>{
    
    setWeek({
      monday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      tuesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      wednesday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      thursday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      friday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      saturday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
      sunday: {breakfast: "", lunch: "", teatime: "", dinner:"" },
    })
    const temp = {...week}
    _storeData(temp)

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
                {allWeek.map((days)=>(
                  <Pressable style = {week[days]["breakfast"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["breakfast"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] }  onPress={()=> handleBreakfast({days})}></Pressable>
                ))}
              </View>                           
            </View>
            <View style= {styles.eachColumn}>
              <Text>LUNCH  </Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days)=>(
                  <Pressable style = {week[days]["lunch"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["lunch"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleLunch({days})}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>TEA TIME  </Text>
              <View style={styles.mealColumns}>  
              {allWeek.map((days)=>(
                  <Pressable style = {week[days]["teatime"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["teatime"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleTeatime({days})}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>DINNER</Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days)=>(
                  <Pressable style = {week[days]["dinner"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["dinner"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleDinner({days})}></Pressable>
                ))}
              </View>
            </View>        
          </View>

          <View >
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalDates}>
              <View style={[styles.modalView, styles.centeredView]}>
             <Text>MONTH: </Text>
             <RNPickerSelect  
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "January", value: "January" },
                     { label: "February", value: "February" },
                     { label: "March", value: "March" },
                     { label: "April", value: "April" },
                     { label: "May", value: "May" },
                     { label: "June", value: "June" },
                     { label: "July", value: "July" },
                     { label: "August", value: "August" },
                     { label: "September", value: "September" },
                     { label: "October", value: "October" },
                     { label: "November", value: "November" },
                     { label: "December", value: "December" },
                     
                 ]}
             />
             <Text> WEEK: </Text>
             <RNPickerSelect
                 onValueChange={(value) => console.log(value)}
                 items={[
                     { label: "1", value: "1" },
                     { label: "2", value: "2" },
                     { label: "3", value: "3" },
                     { label: "4", value: "4" },
                 ]}
             />
             
              <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => setModalDates(!modalDates)}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => setModalDates(!modalDates)}>
              <Text style={styles.textStyle}>x Close</Text>
            </Pressable>
             </View>
             </Modal>
         </View>

         
        

        <View style= {styles.infoTextContainer}>
          <Text style= {styles.infoText1}>You have been choosing healty options {goodMeals}% of the meals you had this week</Text>
          <Text style= {styles.infoText1}> {badMeals}% of the meals were not that healthy</Text>
          <View style={styles.buttonMonthYear}>
            <Button title="+ MONTH STADS." style={styles.buttonMonthYear}></Button>
            <Button title="+ YEAR STADS."></Button>
          </View>
        </View>  

       <View style= {styles.saveOrClear}>
            <Button title="Save week" onPress={()=>saveWeek()} style={styles.saveWeek}></Button>
            <Button title="Clear out week" onPress={()=>clearWeek()} style={styles.clearOut}></Button>
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
            <Pressable style = {styles.notHealthy} onPress={() => manageMeal("healthy")}><Text>Healthy</Text></Pressable>
            <Pressable style = {styles.notHealthy} onPress={() => manageMeal("not healthy")}><Text>Not Healthy</Text></Pressable>
            <Pressable style = {styles.notHealthy} onPress={() => manageMeal("")}><Text>Return to initial value</Text></Pressable>
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
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
    width: 40,
    padding: 13,
    marginBottom: 3,
    elevation: 2,
  },

  buttonOpen: {
    backgroundColor: '#111111',
  },

  buttonOpenGood: {
    backgroundColor: '#CAD473',
  },

  buttonOpenBad: {
    backgroundColor: '#D42500',
  },

  buttonClose: {
    backgroundColor: '#999999',
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
    marginBottom: 3,
    elevation: 2,
  },


  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  infoTextContainer: {
    marginTop: 20,
  },

  notHealthy: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },


  infoText1: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 700,
  },

  buttonMonthYear:{
    flexDirection: 'row',
    justifyContent: 'center',
  },

  saveOrClear: {
    display: 'flex',
    flexDirection: 'row',

  }

  
});