import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {playersList} from './src/json/players';

const App = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCredits, setTotalCredits] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [teamPlayerCount, setTeamPlayerCount] = useState({});

  const playerSelect = (
    player_id,
    event_player_credit,
    role,
    team_name,
    name,
  ) => {
    console.log(
      'PlayerSelect function console log at line 20' + player_id,
      event_player_credit,
      role,
      team_name,
      name,
    );

    if (selectedPlayers.find(player => player.player_id === player_id)) {
      ToastAndroid.show('Player already selected!', ToastAndroid.SHORT);
      return;
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
              {player_id, event_player_credit, team_name, role: role, name},
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
              .length < 7
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              {player_id, event_player_credit, team_name, role: role, name},
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
              .length < 7
          ) {
            setSelectedPlayers([
              ...selectedPlayers,
              {player_id, event_player_credit, team_name, role: role, name},
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
              {player_id, event_player_credit, team_name, role: role, name},
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
    } else {
      ToastAndroid.show('Not enough Credits!', ToastAndroid.SHORT);
    }

    const updatedTeamPlayerCount = {...teamPlayerCount};
    updatedTeamPlayerCount[team_name] = (updatedTeamPlayerCount[team_name] || 0) + 1;
    setTeamPlayerCount(updatedTeamPlayerCount);
  };

  // const clearSelections = () => {
  //   setSelectedPlayers([]);
  //   setTotalCredits(100);
  //   setTeamPlayerCount({});
  // };

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

  return (
    <View style={{backgroundColor: 'white'}}>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: '700',
          color: 'black',
          fontSize: 20,
          marginTop: 15,
        }}>
        Pick Players
      </Text>

      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>
        <View style={{borderWidth: 2, width: 80}}>
          <Text style={{color: 'black', alignSelf: 'center'}}>
            {selectedPlayers.length}/11
          </Text>
          <Text style={{color: 'black', alignSelf: 'center'}}> Players</Text>
        </View>
        <View style={{borderWidth: 2, width: 80}}>
          <Text style={{color: 'black', alignSelf: 'center'}}>
            Melbourne Stars: {teamPlayerCount['Melbourne Stars'] || 0}
          </Text>
        </View>
        <View style={{borderWidth: 2, width: 80}}>
          <Text style={{color: 'black', alignSelf: 'center'}}>
            Perth Scorchers: {teamPlayerCount['Perth Scorchers'] || 0}
          </Text>
        </View>
        <View style={{borderWidth: 2, width: 80}}>
          <Text
            style={{color: 'black', alignSelf: 'center', fontWeight: '700'}}>
            {' '}
            {totalCredits}
          </Text>
          <Text style={{color: 'black', alignSelf: 'center'}}> Cr Left</Text>
        </View>
      </View>

      <View>
      {/* <TouchableOpacity
        style={{ borderWidth: 2, borderRadius: 2, width: 150, alignSelf: 'center', marginTop: 10 }}
        onPress={() => {
          clearSelections
        }}>
        <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Clear Selections</Text>
      </TouchableOpacity> */}
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
          if (item.role === 'Batsman')
            return (
              <View key={index}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        playerSelect(
                          item.player_id,
                          item.event_player_credit,
                          item.role,
                          item.team_name,
                          item.name,
                        );
                        console.log(item.player_id);
                      }}>
                      <Text style={{color: 'black'}}>Name : {item.name}</Text>
                      <Text style={{color: 'black'}}>
                        Team Name : {item.team_name}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          alignSelf: 'flex-end',
                          position: 'absolute',
                        }}>
                        Credit : {item.event_player_credit}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
        })}
        <Text style={{color: 'black', fontSize: 20, paddingLeft: 15}}>
          Pick 1 - 5 Wicket-Keepers
        </Text>
        {playersList.map((item, index) => {
          if (item.role === 'Wicket-Keeper')
            return (
              <View key={index}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        playerSelect(
                          item.player_id,
                          item.event_player_credit,
                          item.role,
                          item.team_name,
                          item.name,
                        );
                        console.log(item.player_id);
                      }}>
                      <Text style={{color: 'black'}}>Name : {item.name}</Text>
                      <Text style={{color: 'black'}}>
                        Team Name : {item.team_name}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Player Credit : {item.event_player_credit}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
        })}
        <Text style={{color: 'black', fontSize: 20, paddingLeft: 15}}>
          Pick 0 - 4 All Rounders
        </Text>
        {playersList.map((item, index) => {
          if (item.role === 'All-Rounder')
            return (
              <View key={index}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        playerSelect(
                          item.player_id,
                          item.event_player_credit,
                          item.role,
                          item.team_name,
                          item.name,
                        );
                        console.log(item.player_id);
                      }}>
                      <Text style={{color: 'black'}}>Name : {item.name}</Text>
                      <Text style={{color: 'black'}}>
                        Team Name : {item.team_name}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Player Credit : {item.event_player_credit}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
        })}
        <Text style={{color: 'black', fontSize: 20, paddingLeft: 15}}>
          Pick 3 - 7 Bowlers
        </Text>
        {playersList.map((item, index) => {
          if (item.role === 'Bowler')
            return (
              <View key={index}>
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{margin: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        playerSelect(
                          item.player_id,
                          item.event_player_credit,
                          item.role,
                          item.team_name,
                          item.name,
                        );
                        console.log(item.player_id);
                      }}>
                      <Text style={{color: 'black'}}>Name : {item.name}</Text>
                      <Text style={{color: 'black'}}>
                        Team Name : {item.team_name}
                      </Text>
                      <Text style={{color: 'black'}}>
                        Player Credit : {item.event_player_credit}
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
          <Text style={{color: 'black', fontSize: 20, alignSelf: 'center'}}>
            Proceed
          </Text>
        </TouchableOpacity>
        <Text style={{marginBottom: 135}}></Text>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View>
          <ScrollView>
            <Text style = {{color: 'black', alignSelf: 'center', fontWeight: '600', fontSize: 20}}>Picked Players</Text>
            {selectedPlayers.map((player, index) => (
              <View key={index}>
                {console.log(player)}
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{margin: 10}}>
                    <Text style={{color: 'black'}}>
                      Team Name: {player.team_name}
                    </Text>
                    <Text style={{color: 'black'}}>Name: {player.name}</Text>
                    <Text style={{color: 'black'}}>
                      Player Credit: {player.event_player_credit}
                    </Text>
                    <Text style={{color: 'black'}}>Role: {player.role}</Text>
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
          <Text style={{color: 'black', fontSize: 20, alignSelf: 'center'}}>
            Back
          </Text>
        </TouchableOpacity>
        <Text></Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default App;
