import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import ProductList from '../../screens/ProductList';
import ProductForm from '../../screens/ProductForm';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductList} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
