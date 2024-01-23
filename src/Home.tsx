import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { playersList } from './json/players';
import Splash from './loader/Splash';

const Home = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCredits, setTotalCredits] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);

  //testing teamname
  const [perthScorchers, setPerthScorchers] = useState(0);
  const [melbourneStars, setMelbourneStars] = useState(0);

  const [splashLoading, setSplashLoading] = useState(false);

  const playerSelect = async (
    player_id,
    event_player_credit,
    role,
    team_name,
    name,
    team_logo,
    points
  ) => {
    // console.log('PlayerSelect function console log at line 30 : ' + 
    // player_id, event_player_credit, 
    // role, team_name, name, 
    // team_logo, points )

    const isSelected = selectedPlayers.some(player => player.player_id === player_id);
    // console.log(isSelected);

    const updatedSelectedPlayers = isSelected
      ? selectedPlayers.filter(player => player.player_id !== player_id)
      : [
        ...selectedPlayers,
        { player_id, event_player_credit, team_name, role: role, name, team_logo, points },
      ];

    if (isSelected) {
      setSelectedPlayers(updatedSelectedPlayers);
      if (team_name === 'Perth Scorchers') {
        setPerthScorchers(perthScorchers - 1);
      } else {
        setMelbourneStars(melbourneStars - 1);
      }
      setTotalCredits(isSelected ? totalCredits + event_player_credit : totalCredits - event_player_credit);
      return;
    }

    if (team_name === 'Perth Scorchers' && !isSelected) {
      setPerthScorchers(perthScorchers + 1);
    } else if (team_name === 'Melbourne Stars' && !isSelected) {
      setMelbourneStars(melbourneStars + 1)
    }

    if (
      selectedPlayers.length < 11 &&
      totalCredits - event_player_credit >= 0 &&
      selectedPlayers.filter(player => player.team_name === team_name).length <
      7
    ) {
      switch (role) {
        case 'Batsman':
          if (
            selectedPlayers.filter(player => player.role === 'Batsman').length <
            7
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              { player_id, event_player_credit, team_name, role: role, name, team_logo, points },
            ]);
            setTotalCredits(totalCredits - event_player_credit);
          } else {
            ToastAndroid.show(
              'You can only select up to 7 Batsman!',
              ToastAndroid.SHORT,
            );
          }
          break;
        case 'Wicket-Keeper':
          if (
            selectedPlayers.filter(player => player.role === 'Wicket-Keeper')
              .length < 5
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              { player_id, event_player_credit, team_name, role: role, name, team_logo, points },
            ]);
            setTotalCredits(totalCredits - event_player_credit);
          } else {
            ToastAndroid.show(
              'You can only select up to 5 Wicket-Keepers!',
              ToastAndroid.SHORT,
            );
          }
          break;
        case 'All-Rounder':
          if (
            selectedPlayers.filter(player => player.role === 'All-Rounder')
              .length < 4
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              { player_id, event_player_credit, team_name, role: role, name, team_logo, points },
            ]);
            setTotalCredits(totalCredits - event_player_credit);
          } else {
            ToastAndroid.show(
              'You can only select up to 4 All-Rounders!',
              ToastAndroid.SHORT,
            );
          }
          break;
        case 'Bowler':
          if (
            selectedPlayers.filter(player => player.role === 'Bowler').length <
            7
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              { player_id, event_player_credit, team_name, role: role, name, team_logo, points },
            ]);
            setTotalCredits(totalCredits - event_player_credit);
          } else {
            ToastAndroid.show(
              'You can only select up to 7 Bowlers!',
              ToastAndroid.SHORT,
            );
          }
          break;
        default:
          break;
      }
    } else if (totalCredits - event_player_credit <= 0) {
      ToastAndroid.show('Not enough Credits!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Team Limit exceeded!', ToastAndroid.SHORT);
    }

  };

  const clearSelections = () => {
    setSelectedPlayers([]);
    setTotalCredits(100);
    setPerthScorchers(0);
    setMelbourneStars(0);
  };

  const openModal = () => {
    if (
      selectedPlayers.length === 11 &&
      selectedPlayers.filter(player => player.role === 'Batsman').length >= 3 &&
      selectedPlayers.filter(player => player.role === 'Batsman').length <= 7 &&
      selectedPlayers.filter(player => player.role === 'Wicket-Keeper')
        .length >= 1 &&
      selectedPlayers.filter(player => player.role === 'Wicket-Keeper')
        .length <= 5 &&
      selectedPlayers.filter(player => player.role === 'All-Rounder').length >=
      0 &&
      selectedPlayers.filter(player => player.role === 'All-Rounder').length <=
      4 &&
      selectedPlayers.filter(player => player.role === 'Bowler').length >= 3 &&
      selectedPlayers.filter(player => player.role === 'Bowler').length <= 7
    ) {
      setModalVisible(true);
    } else {
      ToastAndroid.show(
        'Invalid team composition, Please select 11 players to proceed!',
        ToastAndroid.SHORT,
      );
    }
  };

  //splashscreen
  useEffect(() => {
    setSplashLoading(true)
    setTimeout(() => {
      setSplashLoading(false)
    }, 2000);
  }, [2000])

  return (
    <SafeAreaView style={{ backgroundColor: '#ACACAC' }}>
      <Splash loading={splashLoading} />
      <View>
        <View style={{ borderWidth: 3, borderColor: 'grey', top: -3, backgroundColor: 'black', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, height: 200 }}>

          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '700',
              color: 'white',
              fontSize: 20,
              marginTop: 15,
            }}>
            Pick Players
          </Text>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
            <View style={{ borderWidth: 2, width: 80, borderColor: 'white', padding: 4, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
              <Text style={{ color: 'white', alignSelf: 'center' }}>
                {selectedPlayers.length}/11
              </Text>
              <Text style={{ color: 'white', alignSelf: 'center' }}> Players</Text>
            </View>
            <View style={{ borderWidth: 2, width: 80, borderColor: 'white', padding: 4 }}>
              <Text style={{ color: 'white', alignSelf: 'center' }}>
                {melbourneStars}
              </Text>
              <Text style={{ color: 'white', alignSelf: 'center' }}>
                Melbourne Stars:
              </Text>
            </View>
            <View style={{ borderWidth: 2, width: 80, borderColor: 'white', padding: 4 }}>
              <Text style={{ color: 'white', alignSelf: 'center' }}>
                {perthScorchers}
              </Text>
              <Text style={{ color: 'white', alignSelf: 'center' }}>
                Perth Scorchers:
              </Text>
            </View>
            <View style={{ borderWidth: 2, width: 80, borderColor: 'white', padding: 4, borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
              <Text
                style={{ color: 'white', alignSelf: 'center', fontWeight: '700' }}>
                {totalCredits}
              </Text>
              <Text style={{ color: 'white', alignSelf: 'center' }}> Cr Left</Text>
            </View>
          </View>

          <View>
            <Text></Text>
            <TouchableOpacity
              style={{ borderWidth: 2, borderRadius: 2, width: 150, alignSelf: 'center', marginTop: 10, borderColor: 'white' }}
              onPress={() => {
                clearSelections()
              }}>
              <Text style={{ color: 'white', fontSize: 18, alignSelf: 'center' }}>Clear Selections</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              paddingLeft: 15,
              marginTop: 20,
            }}>
            Pick 3 - 7 Batsman
          </Text>
          {playersList.map((item, index) => {
            const isSelected = selectedPlayers.some(player => player.player_id === item.player_id);
            if (item.role === 'Batsman')
              return (
                <View key={index}>
                  <View
                    style={{
                      borderWidth: isSelected ? 4 : 2,
                      borderColor: isSelected ? 'green' : 'black',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          playerSelect(
                            item.player_id,
                            item.event_player_credit,
                            item.role,
                            item.team_name,
                            item.name,
                            item.team_logo,
                            item.event_total_points
                          );
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={{ uri: item.team_logo }} style={{ height: 39, width: 39, position: 'relative' }} />
                          <Text style={{ color: 'black', fontWeight: '800', fontSize: 15, alignSelf: 'center' }}>{'  ' + item.name}</Text>
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                          }}>
                          {item.event_player_credit} Cr
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 28
                          }}>
                          {item.event_total_points} Pts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
          })}
          <Text style={{ color: 'black', fontSize: 20, paddingLeft: 15 }}>
            Pick 1 - 5 Wicket-Keepers
          </Text>
          {playersList.map((item, index) => {
            const isSelected = selectedPlayers.some(player => player.player_id === item.player_id);
            if (item.role === 'Wicket-Keeper')
              return (
                <View key={index}>
                  <View
                    style={{
                      borderWidth: isSelected ? 4 : 2,
                      borderColor: isSelected ? 'green' : 'black',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          playerSelect(
                            item.player_id,
                            item.event_player_credit,
                            item.role,
                            item.team_name,
                            item.name,
                            item.team_logo,
                            item.event_total_points
                          );
                          // console.log(item.player_id);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={{ uri: item.team_logo }} style={{ height: 39, width: 39, position: 'relative' }} />
                          <Text style={{ color: 'black', fontWeight: '800', fontSize: 15, alignSelf: 'center' }}>{'  ' + item.name}</Text>
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                          }}>
                          {item.event_player_credit} Cr
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 28
                          }}>
                          {item.event_total_points} Pts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
          })}
          <Text style={{ color: 'black', fontSize: 20, paddingLeft: 15 }}>
            Pick 0 - 4 All Rounders
          </Text>
          {playersList.map((item, index) => {
            const isSelected = selectedPlayers.some(player => player.player_id === item.player_id);
            if (item.role === 'All-Rounder')
              return (
                <View key={index}>
                  <View
                    style={{
                      borderWidth: isSelected ? 4 : 2,
                      borderColor: isSelected ? 'green' : 'black',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          playerSelect(
                            item.player_id,
                            item.event_player_credit,
                            item.role,
                            item.team_name,
                            item.name,
                            item.team_logo,
                            item.event_total_points
                          );
                          console.log(item.player_id);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={{ uri: item.team_logo }} style={{ height: 39, width: 39, position: 'relative' }} />
                          <Text style={{ color: 'black', fontWeight: '800', fontSize: 15, alignSelf: 'center' }}>{'  ' + item.name}</Text>
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                          }}>
                          {item.event_player_credit} Cr
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 28
                          }}>
                          {item.event_total_points} Pts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
          })}
          <Text style={{ color: 'black', fontSize: 20, paddingLeft: 15 }}>
            Pick 3 - 7 Bowlers
          </Text>
          {playersList.map((item, index) => {
            const isSelected = selectedPlayers.some(player => player.player_id === item.player_id);
            if (item.role === 'Bowler')
              return (
                <View key={index}>
                  <View
                    style={{
                      borderWidth: isSelected ? 4 : 2,
                      borderColor: isSelected ? 'green' : 'black',
                      margin: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          playerSelect(
                            item.player_id,
                            item.event_player_credit,
                            item.role,
                            item.team_name,
                            item.name,
                            item.team_logo,
                            item.event_total_points
                          );
                          console.log(item.player_id);
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={{ uri: item.team_logo }} style={{ height: 39, width: 39, position: 'relative' }} />
                          <Text style={{ color: 'black', fontWeight: '800', fontSize: 15, alignSelf: 'center' }}>{'  ' + item.name}</Text>
                        </View>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                          }}>
                          {item.event_player_credit} Cr
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 28
                          }}>
                          {item.event_total_points} Pts
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
          })}
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderRadius: 2,
              width: 100,
              alignSelf: 'center',
            }}
            onPress={openModal}>
            <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>
              Proceed
            </Text>
          </TouchableOpacity>
          <Text style={{ marginBottom: 135 }}></Text>
          <Text style={{ marginBottom: 135 }}></Text>
          <Text style={{ marginBottom: 135 }}></Text>
        </ScrollView>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style = {{backgroundColor: '#ACACAC'}}>
          <ScrollView>
            <Text style={{ color: 'black', alignSelf: 'center', fontWeight: '600', fontSize: 20 }}>Picked Players</Text>
            {selectedPlayers.map((player, index) => (
              <View key={index}>
                {/* {console.log(player)} */}
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={{ uri: player.team_logo }} style={{ height: 39, width: 39, position: 'relative' }} />
                      <Text style={{ color: 'black', fontWeight: '800', fontSize: 15, alignSelf: 'center' }}>{'  ' + player.name}</Text>
                    </View>
                    <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                          }}>
                          {player.event_player_credit} Cr
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            top: 28
                          }}>
                          {player.points} Pts
                        </Text>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderRadius: 2,
                width: 100,
                alignSelf: 'center',
              }}
              onPress={() => setModalVisible(false)} >
              <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>
                Back
              </Text>
            </TouchableOpacity>
            <Text></Text>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
