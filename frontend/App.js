import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProductList from './src/screens/ProductList';
import ProductForm from './src/screens/ProductForm'; // Importando a tela ProductForm

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: 'Formulário de Produto' }} />
        {/* Registro da tela ProductForm */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
