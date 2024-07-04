import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { ProductosScreen } from '../Screen/ProductosScreen';
import { RegistroAlmaScreen } from '../Screen/RegistroAlmaScreen';
import { EditarEliminarScreen } from '../Screen/EditarEliminarScreen';
import { ApiScreen } from '../Screen/ApiScreen';
import WelcomeScreen from '../Screen/WelcomeScreen';




const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Welcome" component={WelcomeScreen} /> 
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Registro Almacenado" component={RegistroAlmaScreen} />
      <Tab.Screen name="Editar/Eliminar" component={EditarEliminarScreen} />
      <Tab.Screen name="API" component={ApiScreen} />
      
    </Tab.Navigator>
  );
};
