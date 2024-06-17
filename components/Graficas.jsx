import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function Graficas() {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
  };

  const data = {
    labels: ["asfaf", "sdf", "sdf"],
    datasets: [
      {
        data: [20, 0, 28],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grafica</Text>
      
      <BarChart
          data={data}
          fromZero={true}
          segments={5}
          withVerticalLines={false}
          width={Dimensions.get("window").width}
          height={300}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0,
            color: () => '#ffffff',
          }}
        />


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0099cc',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 10,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'roboto-regular'
    },
    
  });