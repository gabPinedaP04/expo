// VotosContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VotosContext = createContext();

export const VotosProvider = ({ children }) => {
  const [votosPRI, setVotosPRI] = useState(0);
  const [votosPAN, setVotosPAN] = useState(0);
  const [votosMorena, setVotosMorena] = useState(0);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const savedVotosPRI = await AsyncStorage.getItem('votoPRI');
        const savedVotosPAN = await AsyncStorage.getItem('votoPAN');
        const savedVotosMorena = await AsyncStorage.getItem('votoMorena');
        if (savedVotosPRI !== null) setVotosPRI(parseInt(savedVotosPRI) || 0);
        if (savedVotosPAN !== null) setVotosPAN(parseInt(savedVotosPAN) || 0);
        if (savedVotosMorena !== null) setVotosMorena(parseInt(savedVotosMorena) || 0);
      } catch (error) {
        console.error('Error loading votes:', error);
      }
    };

    loadVotes();
  }, []);

  const votar = async (party) => {
    try {
      if (party === 'PRI') {
        const newVoteCount = votosPRI + 1;
        await AsyncStorage.setItem('votoPRI', newVoteCount.toString());
        setVotosPRI(newVoteCount);
      } else if (party === 'PAN') {
        const newVoteCount = votosPAN + 1;
        await AsyncStorage.setItem('votoPAN', newVoteCount.toString());
        setVotosPAN(newVoteCount);
      } else if (party === 'Morena') {
        const newVoteCount = votosMorena + 1;
        await AsyncStorage.setItem('votoMorena', newVoteCount.toString());
        setVotosMorena(newVoteCount);
      }
    } catch (error) {
      console.error('Error saving vote:', error);
    }
  };

  return (
    <VotosContext.Provider value={{ votosPRI, votosPAN, votosMorena, votar }}>
      {children}
    </VotosContext.Provider>
  );
};
