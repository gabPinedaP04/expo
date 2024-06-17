import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Boleta() {
  const [votoPRI, setVotoPRI] = useState(0);
  const [votoPAN, setVotoPAN] = useState(0);
  const [votoMorena, setVotoMorena] = useState(0);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const savedVotoPRI = await AsyncStorage.getItem('votoPRI');
        const savedVotoPAN = await AsyncStorage.getItem('votoPAN');
        const savedVotoMorena = await AsyncStorage.getItem('votoMorena');

        if (savedVotoPRI !== null) setVotoPRI(parseInt(savedVotoPRI) || 0);
        if (savedVotoPAN !== null) setVotoPAN(parseInt(savedVotoPAN) || 0);
        if (savedVotoMorena !== null) setVotoMorena(parseInt(savedVotoMorena) || 0);
      } catch (error) {
        console.error('Error loading votes:', error);
      }
    };

    loadVotes();
  }, []);

  const votar = async (party) => {
    try {
      if (party === 'PRI') {
        const newVoteCount = votoPRI + 1;
        await AsyncStorage.setItem('votoPRI', newVoteCount.toString());
        setVotoPRI(newVoteCount);
        Alert.alert('Voto registrado', 'Has votado por el PRI');
        console.log(votoPRI)
      } else if (party === 'PAN') {
        const newVoteCount = votoPAN + 1;
        await AsyncStorage.setItem('votoPAN', newVoteCount.toString());
        setVotoPAN(newVoteCount);
        Alert.alert('Voto registrado', 'Has votado por el PAN');
        console.log(votoPAN)
      } else if (party === 'Morena') {
        const newVoteCount = votoMorena + 1;
        await AsyncStorage.setItem('votoMorena', newVoteCount.toString());
        setVotoMorena(newVoteCount);
        Alert.alert('Voto registrado', 'Has votado por Morena');
        console.log(votoMorena)
      }
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  };

  const detalles = () => {
    console.log("detalles mostrar");
  };


  return (
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Candidatos</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity>
              <Text style={styles.title}>PRI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.detailsButton]}
              onPress={detalles}>
              <Text style={styles.buttonText}>Detalles</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.voteButton]}
              onPress={() => votar('PRI')}>
              <Text style={styles.buttonText}>Votar</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
          </View>
        </View>
        {votoPRI === 'PRI' && <Text>Has votado por el PRI</Text>}
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Candidatos</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity>
              <Text style={styles.title}>PAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.detailsButton]}
              onPress={detalles}>
              <Text style={styles.buttonText}>Detalles</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.voteButton]}
              onPress={() => votar('PAN')}>
              <Text style={styles.buttonText}>Votar</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
          </View>
        </View>
        {votoPAN === 'PAN' && <Text>Has votado por el PAN</Text>}
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Candidatos</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity>
              <Text style={styles.title}>Morena</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.detailsButton]}
              onPress={detalles}>
              <Text style={styles.buttonText}>Detalles</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.voteButton]}
              onPress={() => votar('Morena')}>
              <Text style={styles.buttonText}>Votar</Text>
              <Image style={styles.buttonIcon} source={{ uri: 'svg_path_here' }} />
            </TouchableOpacity>
          </View>
        </View>
        {votoMorena === 'Morena' && <Text>Has votado por Morena</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
});

// Funciones de ejemplo para manejar los botones (detalles y votar)
const detalles = () => {
  console.log('Detalles');
};

const votar = () => {
  console.log('Votar');
};
