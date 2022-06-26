import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Montserrat_400Regular, Montserrat_500Medium_Italic, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Rajdhani_700Bold, Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import { Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { LoginRoutes } from './src/routes';

export default function App() {
  const [fonts] = useFonts({
    //Cuida de quando as fontes são carregadas
    //Todas as fontes usadas no app
    Oswald_400Regular,
    Montserrat_400Regular,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Rajdhani_700Bold,
    Rajdhani_600SemiBold
  })

  if(!fonts){
    //Segura a tela de splash enquanto o app é carregado
    return <AppLoading />
  }

  return (
    <> 
      <StatusBar
        style='light'
        backgroundColor = 'transparent'
        translucent 
      />

      <LoginRoutes />
    </>
  );
}