import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando as telas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductList from '../screens/ProductList';
import ProductForm from '../screens/ProductForm';
import EditProduct from '../screens/EditProduct'; // Importando a tela de edição

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true, // Mostra o header por padrão
          headerStyle: { backgroundColor: '#007BFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Oculta o header nesta tela
        />
        {/* Tela de Registro */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Criar Conta',
          }}
        />
        {/* Tela Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Bem-vindo',
          }}
        />
        {/* Lista de Produtos */}
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{
            title: 'Lista de Produtos',
          }}
        />
        {/* Formulário de Produtos */}
        <Stack.Screen
          name="ProductForm"
          component={ProductForm}
          options={{
            title: 'Adicionar Produto',
          }}
        />
        {/* Edição de Produto */}
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={({ route }) => ({
            title: `Editar Produto - ${route.params?.productName || 'Produto'}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
