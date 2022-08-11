import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Scale, {verticalScale} from '../utils/Scale';
import axios from 'axios';

const Details = ({route, navigation}) => {
  const {characterItem} = route.params;
  const [characterDetailsData, setcharacterDetailsData] = useState([]);
  const [episodeData, setepisodeData] = useState([]);

  useEffect(() => {
    location(characterItem.location.url);
    episode();
  }, []);

  const location = url => {
    axios({
      method: 'get',
      url: url,
    })
      .then(response => {
        console.log('Details response ===>>>', response.data);
        setcharacterDetailsData(response.data);
      })
      .catch(function (error) {
        console.log('Details Error ====>>>', error);
      });
  };

  const episode = () => {
    let episodelist = [];
    let episodeNumbers = '';
    episodelist = characterItem.episode;
    console.log('episodelist response ===>>>', episodelist);

    for (let index = 0; index < episodelist.length; index++) {
      const elements = episodelist[index].split('//')[1].split('/')[3];
      console.log('=======url=========', elements);
      //   episodeNumbers.push(elements);
      episodeNumbers += elements + ', ';
    }
    console.log('=======episodeNumbers=========', episodeNumbers);

    axios({
      method: 'get',
      url: 'https://rickandmortyapi.com/api/episode/' + episodeNumbers,
    })
      .then(response => {
        console.log('episode response ===>>>', response.data);
        setepisodeData(response.data);
      })
      .catch(function (error) {
        console.log('episode Error ====>>>', error);
      });
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.sideheadings}>Character Details </Text>

        <Image source={{uri: characterItem.image}} style={styles.avtar} />

        <View style={styles.textView}>
          <Text style={styles.textStyle}>Id: {characterItem.id} </Text>

          <Text style={styles.textStyle}>Name: {characterItem.name} </Text>
          <Text style={styles.textStyle}>Gender: {characterItem.gender}</Text>
          <Text style={styles.textStyle}>Species {characterItem.species}</Text>
          <Text style={styles.textStyle}>Status: {characterItem.status}</Text>

          <Text style={styles.textStyle}>
            Origin: {characterItem.origin.name}
          </Text>

          <Text style={styles.textStyle}>
            Location: {characterItem.location.name}
          </Text>
          <Text style={styles.textStyle}>
            Type: {characterDetailsData.type}
          </Text>
          <Text style={styles.textStyle}>
            Dimension: {characterDetailsData.dimension}
          </Text>

          <Text style={styles.textStyle}>
            Amount Of Residents : {characterDetailsData?.residents?.length}
          </Text>

          <Text style={styles.textStyle}>
            Name of the chapters the character is featured in:
          </Text>

          <FlatList
            data={episodeData}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <View style={styles.episodeView}>
                <Text style={styles.episodeViewText1}>{item.id}</Text>

                <Text style={styles.episodeViewText2}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  sideheadings: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Scale(20),
    margin: verticalScale(20),
  },

  avtar: {
    height: Scale(200),
    width: Scale(200),
    alignSelf: 'center',
    borderRadius: Scale(20),
  },
  textView: {marginStart: Scale(20), marginTop: Scale(10)},
  textStyle: {fontWeight: 'bold', fontSize: Scale(16)},

  episodeView: {
    // marginStart: Scale(20),
    marginTop: Scale(10),
    flexDirection: 'row',
    // borderWidth: 1,
  },
  episodeViewText1: {
    fontSize: Scale(12),
    marginHorizontal: Scale(10),
    // alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    color: 'black',
    width: Scale(20),
  },
  episodeViewText2: {
    fontSize: Scale(12),
    // margin: Scale(10),
    // alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    color: 'black',
  },
});
