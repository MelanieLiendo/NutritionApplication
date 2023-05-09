import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Modal, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHistoric, setModalHistoric] = useState(false);  
  const [modalSave, setModalSave] = useState(false);
  const [day, setDay] = useState(null)
  const [meal, setMeal]= useState( null)
  const [input, setInput] = useState("")
  const [countHealthy, setCountHealthy] = useState(0)
  const [countUnhealthy, setCountUnhealthy]= useState(0)
  const [goodMeals, setGoodMeals] = useState("")
  const [badMeals, setBadMeals] = useState("")
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


  const saveWeek = () => {
    setModalSave(true)
  }

  const saveKey = () => {
    let temp = [...arrWeeks]
    temp.push({"dates": input,"healthy": countHealthy, "unhealthy": countUnhealthy, "takenMeals": countHealthy+countUnhealthy})
    console.log(temp)
    setArrWeeks(temp)
    setCountHealthy(0)
    setCountUnhealthy(0)
    clearWeek()
    _storeHistorical(temp)


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
                  [styles.button, styles.buttonOpen] }  onPress={()=> handleColor({days}, "breakfast")}></Pressable>
                ))}
              </View>                           
            </View>
            <View style= {styles.eachColumn}>
              <Text>LUNCH  </Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days)=>(
                  <Pressable   style = {week[days]["lunch"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["lunch"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "lunch")}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>TEA TIME  </Text>
              <View style={styles.mealColumns}>  
              {allWeek.map((days)=>(
                  <Pressable style = {week[days]["teatime"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["teatime"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "teatime")}></Pressable>
                ))}
              </View>
            </View>
            <View style= {styles.eachColumn}>
              <Text>DINNER</Text>
              <View style={styles.mealColumns}>
              {allWeek.map((days)=>(
                  <Pressable style = {week[days]["dinner"] == "not healthy" ?  [styles.button, styles.buttonOpenBad] : 
                  week[days]["dinner"] == "healthy" ? [styles.button, styles.buttonOpenGood] : 
                  [styles.button, styles.buttonOpen] } onPress={()=> handleColor({days}, "dinner")}></Pressable>
                ))}
              </View>
            </View>   
          </View>
          


        <View style= {styles.infoTextContainer}>
          <Text style= {styles.infoText1}>Healthy Meals: {goodMeals}% </Text>
          <Text style= {styles.infoText1}>Unhealthy Meals:{badMeals}% </Text>

          
        </View>  

       <View style= {styles.saveOrClear}>
          <Button title="Clear out week" onPress={()=>clearWeek()} style={styles.clearOut}></Button>
          <Button title="Save Week" onPress={()=>saveWeek()} style={styles.clearOut}></Button>
          <Button title="Historic weeks" onPress={()=>historic()} style={styles.clearOut}></Button>
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
              style={[styles.buttonCloseModal, styles.buttonClose]}
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
            
            {arrWeeks.map((week, index) =>(
              <View style={styles.mapWeeks}>
                <View style={styles.mapWeeksInfo}>
              <Text>Dates:{week.dates}</Text>
              <Text>Healthy meals:  {week.healthy}  ({Math.round(week.healthy*100/(week.takenMeals))}%)</Text>
              <Text>Unhealthy meals:  {week.unhealthy}  ({Math.round(week.unhealthy*100/(week.takenMeals))}%)</Text>
              <Text>Taken meals:  {week.unhealthy + week.healthy} </Text>
                </View>
              <Pressable style={styles.deleteWeekButton} onPress={()=>handleDeleteWeek(index)}>
                <Text style= {styles.deleteWeekText}>Delete Week</Text>
                </Pressable>
              </View>
            ) )}

            <Text>Healthy meals:{((arrWeeks.reduce((totalHealthy,acc)=>(totalHealthy +(acc.healthy)),0))*100/( arrWeeks.reduce((totalMeal,acc)=>(totalMeal +(acc.totalMeals)),0)))}%</Text>

            
            
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => setModalHistoric(!modalHistoric)}>
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
        visible={modalSave}
        onRequestClose={() => {
          setModalSave(!modalSave);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalSave}>
            <Text>Dates:</Text>
          <TextInput onChangeText={setInput} placeholder='write days'/>
          <View style={styles.modalButtons}>
          <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => [setModalSave(!modalSave), saveKey()]}>
              <Text style={styles.textStyleModalSave}>Save</Text>
            </Pressable>       
            
            <Pressable
              style={[styles.buttonCloseModal, styles.buttonClose]}
              onPress={() => setModalSave(!modalSave)}>
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
    backgroundColor: '#E6E3E3',
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
    backgroundColor: '#111111',
  },

  buttonOpenGood: {
    backgroundColor: '#CAD473',
  },

  buttonOpenBad: {
    backgroundColor: '#D42500',
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
    marginTop: 60,
  },

  


  infoText1: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 700,
  },


  saveOrClear: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,

  },

  mapWeeks: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: '1px',
    marginBottom: 10,
    gap: 40,
    padding: 15,
    borderRadius: 100,

  },

  mapWeeksInfo: {
    marginLeft: 10,
    gap: 3,
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
    padding: 40,
    alignItems: 'center',
    gap: 20,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,


  },

  modalVisibleButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 60,
    marginTop: 100,
  },

  modalVisibleButton1: {
    backgroundColor: '#CAD473',
    borderRadius: 20,
    padding: 15,

  },

  modalVisibleButton2: {
    backgroundColor: '#D42500',
    borderRadius: 20,
    padding: 15,

  },

  modalVisibleButton3: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding:15,

  },

  modalMap: {
    backgroundColor: '#F7F43C',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    gap: 20,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    maxHeight: 1000,

  },

  deleteWeekButton : {
    backgroundColor: 'black',
    elevation: 2,
    justifyContent: 'center',
    paddingLeft:3,
    paddingRight: 3,
    borderRadius: 100,
  },

  deleteWeekText: {
    color: 'white',
  }

 

  


  
});