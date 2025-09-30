import React, { useState, useEffect, useRef } from 'react';
import { Button, Platform, View, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configuración de notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Registrar token y configurar listeners
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener cuando llega la notificación
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setNotificationData(notification.request.content.data || null);
      console.log('Notificación recibida:', notification);
      console.log('Datos recibidos:', notification.request.content.data);
    });

    // Listener cuando el usuario interactúa con la notificación
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log('Usuario clickeó notificación con datos:', data);
      Alert.alert('Notificación clickeada', JSON.stringify(data));
    });

    // Cleanup de listeners
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Expo Push Token:</Text>
      <Text selectable>{expoPushToken}</Text>

      {notification && (
        <View style={{ marginTop: 20 }}>
          <Text>Última Notificación:</Text>
          <Text>Título: {notification.request.content.title}</Text>
          <Text>Mensaje: {notification.request.content.body}</Text>
          {notificationData && (
            <View style={{ marginTop: 10 }}>
              <Text>Datos JSON:</Text>
              <Text>{JSON.stringify(notificationData, null, 2)}</Text>
            </View>
          )}
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="Enviar notificación local de prueba"
          onPress={async () => await sendLocalNotification()}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Simular notificación remota con JSON"
          onPress={async () => await sendRemoteNotificationExample(expoPushToken)}
        />
      </View>
    </View>
  );
}

// Notificación local PUSG
async function sendLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '¡Notificación local!',
      body: 'Este es un mensaje local HOLIS',
      data: {
        tipo: 'local',
        id: 1,
        contenido: 'Mensaje desde notificación local'
      },
    },
    trigger: { seconds: 2 },
  });
}

// Ejemplo de envío remoto usando fetch a la API de Expo JSON
async function sendRemoteNotificationExample(token) {
  if (!token) {
    alert('No hay token disponible para enviar notificación remota');
    return;
  }

  const message = {
    to: token,
    title: '¡Notificación remota!',
    body: 'Este mensaje viene con datos JSON',
    data: {
      tipo: 'remota',
      id: 123,
      usuario: 'Melis',
      contenido: 'Este mensaje se envió desde la API de Expo',
    }
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = await response.json();
    console.log('Respuesta de Expo Push API:', data);
    Alert.alert('Notificación remota enviada', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

// Registrar token para notificaciones push
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('No se pudieron obtener los permisos de notificación.');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } else {
    alert('Necesitas un dispositivo físico para recibir notificaciones push.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
