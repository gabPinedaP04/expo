import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

export default function Boleta() {
  const [votoPRI, setVotoPRI] = useState(0);
  const [votoPAN, setVotoPAN] = useState(0);
  const [votoMorena, setVotoMorena] = useState(0);
  const [showPropuestasPRI, setShowPropuestasPRI] = useState(false);
  const [showPropuestasPAN, setShowPropuestasPAN] = useState(false);
  const [showPropuestasMorena, setShowPropuestasMorena] = useState(false);

  const propuestas = {
    PRI: "Propuesta del PRI...",
    PAN: "Propuesta del PAN...",
    Morena: "Propuesta de Morena..."
  };

  const mostrarPropuestas = (party) => {
    switch (party) {
      case 'PRI':
        setShowPropuestasPRI(!showPropuestasPRI);
        setShowPropuestasPAN(false);
        setShowPropuestasMorena(false);
        break;
      case 'PAN':
        setShowPropuestasPAN(!showPropuestasPAN);
        setShowPropuestasPRI(false);
        setShowPropuestasMorena(false);
        break;
      case 'Morena':
        setShowPropuestasMorena(!showPropuestasMorena);
        setShowPropuestasPRI(false);
        setShowPropuestasPAN(false);
        break;
      default:
        break;
    }
  };
  // Cargar los votos almacenados al iniciar
  useEffect(() => {
    const loadVotes = async () => {
      try {
        const savedVotoPRI = await AsyncStorage.getItem('votoPRI');
        const savedVotoPAN = await AsyncStorage.getItem('votoPAN');
        const savedVotoMorena = await AsyncStorage.getItem('votoMorena');

        setVotoPRI(parseInt(savedVotoPRI) || 0);
        setVotoPAN(parseInt(savedVotoPAN) || 0);
        setVotoMorena(parseInt(savedVotoMorena) || 0);
      } catch (error) {
        console.error('Error loading votes:', error);
      }
    };

    loadVotes();
  }, []);

  // Función para registrar un voto
  const votar = async (party) => {
    try {
      let newVoteCount;
      switch (party) {
        case 'PRI':
          newVoteCount = votoPRI + 1;
          await AsyncStorage.setItem('votoPRI', newVoteCount.toString());
          setVotoPRI(newVoteCount);
          Alert.alert('Voto registrado', 'Has votado por el PRI');
          console.log(votoPRI)
          break;
        case 'PAN':
          newVoteCount = votoPAN + 1;
          await AsyncStorage.setItem('votoPAN', newVoteCount.toString());
          setVotoPAN(newVoteCount);
          Alert.alert('Voto registrado', 'Has votado por el PAN');
          console.log(votoPAN)
          break;
        case 'Morena':
          newVoteCount = votoMorena + 1;
          await AsyncStorage.setItem('votoMorena', newVoteCount.toString());
          setVotoMorena(newVoteCount);
          Alert.alert('Voto registrado', 'Has votado por Morena');
          console.log(votoMorena)
          break;
        default:
          return;
      }
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  };

  // Estilo para los componentes
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
    card: {
      width: Dimensions.get('window').width * 0.8, // Ajustar el ancho de la tarjeta
      backgroundColor: '#f0f0f0',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000000',
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    button: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailsButton: {
      backgroundColor: '#4caf50',
      marginLeft: 10,
    },
    voteButton: {
      backgroundColor: '#2196f3',
      marginLeft: 10,
    },
    buttonIcon: {
      width: 20,
      height: 20,
      marginLeft: 5,
    },
  });

  // Datos para la gráfica
  const data = {
    labels: ["PRI", "PAN", "Morena"],
    datasets: [
      {
        data: [votoPRI, votoPAN, votoMorena],
      },
    ],
  };

  return (<View style={styles.container}>
    <Text style={styles.header}>Candidatos</Text>

    {/* Tarjeta para PRI */}
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>PRI</Text>
        <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={() => mostrarPropuestas('PRI')}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.voteButton]} onPress={() => votar('PRI')}>
          <Text style={styles.buttonText}>Votar</Text>
        </TouchableOpacity>
      </View>
      {showPropuestasPRI && (
        <View style={styles.propuestasContainer}>
          <Text style={styles.propuestasText}>{propuestas.PRI}</Text>
        </View>
      )}
    </View>

    {/* Tarjeta para PAN */}
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>PAN</Text>
        <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={() => mostrarPropuestas('PAN')}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.voteButton]} onPress={() => votar('PAN')}>
          <Text style={styles.buttonText}>Votar</Text>
        </TouchableOpacity>
      </View>
      {showPropuestasPAN && (
        <View style={styles.propuestasContainer}>
          <Text style={styles.propuestasText}>{propuestas.PAN}</Text>
        </View>
      )}
    </View>

    {/* Tarjeta para Morena */}
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>Morena</Text>
        <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={() => mostrarPropuestas('Morena')}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.voteButton]} onPress={() => votar('Morena')}>
          <Text style={styles.buttonText}>Votar</Text>
        </TouchableOpacity>
      </View>
      {showPropuestasMorena && (
        <View style={styles.propuestasContainer}>
          <Text style={styles.propuestasText}>{propuestas.Morena}</Text>
        </View>
      )}
    </View>

    {/* Gráfica */}
    <View style={styles.graphContainer}>
      <Text style={styles.header}>Resultados de Votación</Text>
      <BarChart
        data={{
          labels: ['PRI', 'PAN', 'Morena'],
          datasets: [
            {
              data: [votoPRI, votoPAN, votoMorena],
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9}
        height={300}
        yAxisLabel="votos"
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2,
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
        }}
      />
    </View>
    <View>
      <Text>Morena: {votoMorena} PAN: {votoPAN} PRI: {votoPRI}</Text>
    </View>
  </View>
  );
}


const detalles = () => {
  console.log('Detalles');
};
