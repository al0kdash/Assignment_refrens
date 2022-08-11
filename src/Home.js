import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Scale, {verticalScale} from '../utils/Scale';

export default function Home({navigation}) {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const [characterData, setcharacterData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    axios({
      method: 'get',
      url: baseUrl,
    })
      .then(response => {
        console.log('response ===>>>', response.data);
        setcharacterData(response.data.results);
      })
      .catch(function (error) {
        console.log('Error ====>>>', error);
      });
  };

  const loadMoreData = () => {
    setCount(count + 1);
    axios({
      method: 'get',
      url: `${baseUrl}?page=` + {count},
    })
      .then(response => {
        console.log('response ===>>>', response.data);
        setcharacterData([...characterData, ...response.data.results]);
      })
      .catch(function (error) {
        console.log('Error ====>>>', error);
      });
  };

  return (
    <View>
      <Text style={styles.sideheadings}>All Characters </Text>

      <FlatList
        data={characterData}
        keyExtractor={(item, index) => index}
        onEndReached={loadMoreData}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', {
                characterItem: item,
              })
            }>
            <>
              <Image source={{uri: item.image}} style={styles.avtar} />
            </>

            <View style={styles.textView}>
              <Text style={styles.textStyle}>Name: {item.name} </Text>
              <Text style={styles.textStyle}>Gender: {item.gender}</Text>
              <Text style={styles.textStyle}>Species {item.species}</Text>
              <Text style={styles.textStyle}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sideheadings: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Scale(20),
    margin: verticalScale(20),
  },
  card: {
    borderWidth: 1,
    flexDirection: 'row',
    padding: Scale(10),
    marginVertical: verticalScale(10),
  },
  avtar: {height: Scale(100), width: Scale(100)},
  textView: {marginLeft: Scale(20), alignSelf: 'center'},
  textStyle: {fontWeight: 'bold', fontSize: Scale(10)},
});
