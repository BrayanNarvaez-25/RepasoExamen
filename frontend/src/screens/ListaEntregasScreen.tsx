import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useEntregas } from '../context/EntregaContext';
import { Entrega } from '../database/db';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<any>;

export default function ListaEntregasScreen({ navigation }: { navigation: NavigationProp }) {
  const { entregas, cargarEntregas, eliminarEntrega } = useEntregas();

  // Recarga la lista cada vez que la pantalla vuelve a estar en foco
  useFocusEffect(
    useCallback(() => {
      cargarEntregas();
    }, [])
  );

  function confirmarEliminar(entrega: Entrega) {
    Alert.alert(
      'Eliminar entrega',
      `¿Seguro que deseas eliminar la guía ${entrega.guia}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarEntrega(entrega.id),
        },
      ]
    );
  }

  function renderItem({ item }: { item: Entrega }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        {item.fotoBase64 ? (
          <Image source={{ uri: item.fotoBase64 }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
            <Ionicons name="image-outline" size={24} color={colors.textLight} />
          </View>
        )}

        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Ionicons name="cube" size={18} color={colors.primary} />
            <Text style={styles.guia}>{item.guia}</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="person-outline" size={14} color={colors.textLight} />
            <Text style={styles.cardText}>{item.destinatario}</Text>
          </View>

          <View style={styles.cardRow}>
            <Ionicons name="cash-outline" size={14} color={colors.textLight} />
            <Text style={styles.cardText}>${item.montoCobro.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primaryLight }]}
          onPress={() => navigation.navigate('FormularioEntrega', { entrega: item })}
        >
          <Ionicons name="create-outline" size={18} color={colors.primaryDark} />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#FFCDD2' }]}
          onPress={() => confirmarEliminar(item)}
        >
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
          <Text style={[styles.actionText, { color: colors.danger }]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={entregas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="file-tray-outline" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>Aún no hay entregas registradas</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('FormularioEntrega')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  guia: { fontSize: 17, fontWeight: '700', color: colors.text },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  cardText: { fontSize: 14, color: colors.textLight },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  actionText: { fontSize: 13, fontWeight: '600', color: colors.primaryDark },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    gap: 10,
  },
  emptyText: { color: colors.textLight, fontSize: 15 },
  cardTop: {
  flexDirection: 'row',
  gap: 12,
},
thumbnail: {
  width: 64,
  height: 64,
  borderRadius: 10,
},
thumbnailPlaceholder: {
  backgroundColor: colors.background,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: colors.border,
},
cardInfo: {
  flex: 1,
  justifyContent: 'center',
},
});