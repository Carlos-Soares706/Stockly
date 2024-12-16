import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function ProductForm({ route, navigation }) {
  // Recupera dados do produto caso seja edição
  const product = route.params?.product;

  // Estados para os campos do formulário
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [quantity, setQuantity] = useState(product?.quantity?.toString() || '0');

  // Função para salvar ou atualizar
  const handleSubmit = async () => {
    try {
      if (product) {
        // Atualiza produto (PUT)
        await api.put(`/products/${product.id}`, {
          name,
          description,
          quantity: parseInt(quantity),
        });
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        // Cria produto (POST)
        await api.post('/products', {
          name,
          description,
          quantity: parseInt(quantity),
        });
        Alert.alert('Sucesso', 'Produto criado com sucesso!');
      }

      navigation.goBack(); // Retorna à lista de produtos
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Campo: Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />

      {/* Campo: Descrição */}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      {/* Campo: Quantidade */}
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* Botão de Salvar */}
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
