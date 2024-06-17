import React, { createContext, useContext } from 'react'
import { useFonts } from 'expo-font'

const FontContext = createContext()

export const useFontContext = () => {
  return useContext(FontContext)
}

export const FontProvider = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  })

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  )
}
