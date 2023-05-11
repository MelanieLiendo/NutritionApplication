import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ScrollView, Modal, Alert, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HistoricWeeks() {

    const [modalHistoric, setModalHistoric] = useState(false);  







  return (
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
              <View style={styles.initialDate}>
                <Text style={styles.importantText}>Week starting: {week.dates}</Text>
              <View style={styles.mapWeeks}>
                <View style={styles.mapWeeksInfo}>              
              <Text>Healthy meals:  {week.healthy}  ({week.takenMeals != 0 ? Math.round(week.healthy*100/(week.takenMeals)): 0}%)</Text>
              <Text>Unhealthy meals:  {week.unhealthy}  ({week.takenMeals != 0 ? Math.round(week.unhealthy*100/(week.takenMeals)): 0}%)</Text>
              <Text>Taken meals:  {week.unhealthy + week.healthy} </Text>
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
  )
}

export default HistoricWeeks