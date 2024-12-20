import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import api from '../services/api';

const ProductForm = ({ route, navigation }) => {
  const [name, setName] = useState(route?.params?.product?.name || '');
  const [description, setDescription] = useState(route?.params?.product?.description || '');
  const [quantity, setQuantity] = useState(
    route?.params?.product?.quantity ? route.params.product.quantity.toString() : ''
  );
  const [image, setImage] = useState(route?.params?.product?.image || null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Solicitar permissão para uso da câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função para capturar a imagem com a câmera
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
      setIsCameraActive(false); // Fecha a câmera após tirar a foto
    }
  };

  // Função para fazer upload da imagem
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `image_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url; // Retorna a URL da imagem
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Não foi possível fazer o upload da imagem.');
      return null;
    }
  };

  // Função para salvar o produto
  const handleSubmit = async () => {
    if (!name || !description || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    let imageUrl = image;

    if (image && !image.startsWith('http')) {
      // Faz upload se a imagem for local
      imageUrl = await uploadImage(image);
      if (!imageUrl) return; // Interrompe se o upload falhar
    }

    const product = { name, description, quantity: Number(quantity), image: imageUrl };

    try {
      if (route?.params?.product) {
        // Editar produto existente
        await api.put(`/products/${route.params.product._id}`, product);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        // Adicionar novo produto
        await api.post('/products', product);
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar produto', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto. Tente novamente.');
    }
  };

  // Exibir mensagem de permissão negada
  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão para usar a câmera foi negada.</Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {isCameraActive ? (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>Capturar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsCameraActive(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </Camera>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>
            {route?.params?.product ? 'Editar Produto' : 'Adicionar Produto'}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do produto"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a descrição"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <TouchableOpacity style={styles.imagePicker} onPress={() => setIsCameraActive(true)}>
            <Text style={styles.imagePickerText}>{image ? 'Alterar Foto' : 'Tirar Foto'}</Text>
          </TouchableOpacity>

          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  imagePicker: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductForm;
