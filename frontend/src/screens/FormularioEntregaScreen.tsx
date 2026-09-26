import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useEntregas } from '../context/EntregaContext';
import { Entrega } from '../database/db';
import { colors } from '../theme/colors';

type ParamList = {
  FormularioEntrega: { entrega?: Entrega } | undefined;
};

type Props = {
  route: RouteProp<ParamList, 'FormularioEntrega'>;
  navigation: NativeStackNavigationProp<any>;
};

export default function FormularioEntregaScreen({ route, navigation }: Props) {
  const { guardarEntrega } = useEntregas();
  const entregaEditar = route.params?.entrega;
  const esEdicion = !!entregaEditar;

  const [guia, setGuia] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [montoCobro, setMontoCobro] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Detecta si venimos en modo edición y precarga los datos
  useEffect(() => {
    if (entregaEditar) {
      setGuia(entregaEditar.guia);
      setDestinatario(entregaEditar.destinatario);
      setMontoCobro(entregaEditar.montoCobro.toString());
      setFotoBase64(entregaEditar.fotoBase64);
    }

    navigation.setOptions({
      title: esEdicion ? 'Editar Entrega' : 'Registrar Entrega',
    });
  }, [entregaEditar]);

  async function tomarFoto() {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara para tomar la foto del comprobante.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64) {
      setFotoBase64(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  }

  async function handleGuardar() {
    if (!guia.trim() || !destinatario.trim() || !montoCobro.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa guía, destinatario y monto.');
      return;
    }

    const monto = parseFloat(montoCobro);
    if (isNaN(monto)) {
      Alert.alert('Monto inválido', 'El monto de cobro debe ser un número.');
      return;
    }

    setGuardando(true);
    try {
      await guardarEntrega(
        {
          guia: guia.trim(),
          destinatario: destinatario.trim(),
          montoCobro: monto,
          fotoBase64,
          fecha: new Date().toISOString(),
        },
        entregaEditar?.id
      );
      navigation.goBack();
    } finally {
      setGuardando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.label}>Número de guía</Text>
          <TextInput
            style={styles.input}
            value={guia}
            onChangeText={setGuia}
            placeholder="Ej. GUIA-001"
            placeholderTextColor={colors.textLight}
          />

          <Text style={styles.label}>Destinatario</Text>
          <TextInput
            style={styles.input}
            value={destinatario}
            onChangeText={setDestinatario}
            placeholder="Nombre del destinatario"
            placeholderTextColor={colors.textLight}
          />

          <Text style={styles.label}>Monto a cobrar</Text>
          <TextInput
            style={styles.input}
            value={montoCobro}
            onChangeText={setMontoCobro}
            placeholder="0.00"
            placeholderTextColor={colors.textLight}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Foto del comprobante (opcional)</Text>
          <TouchableOpacity style={styles.photoBtn} onPress={tomarFoto}>
            <Ionicons name="camera-outline" size={20} color={colors.primaryDark} />
            <Text style={styles.photoBtnText}>
              {fotoBase64 ? 'Tomar otra foto' : 'Tomar foto'}
            </Text>
          </TouchableOpacity>

          {fotoBase64 && (
            <Image source={{ uri: fotoBase64 }} style={styles.preview} />
          )}

          <TouchableOpacity
            style={[styles.saveBtn, guardando && { opacity: 0.6 }]}
            onPress={handleGuardar}
            disabled={guardando}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.saveBtnText}>
              {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Entrega' : 'Guardar Entrega'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  form: { padding: 20, paddingBottom: 60 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  photoBtnText: { color: colors.primaryDark, fontWeight: '600', fontSize: 14 },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 14,
  },
  saveBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 32,
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});