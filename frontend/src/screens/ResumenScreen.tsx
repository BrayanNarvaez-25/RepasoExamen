import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEntregas } from '../context/EntregaContext';
import { colors } from '../theme/colors';

export default function ResumenScreen() {
  const { entregas } = useEntregas();

  const totalEntregas = entregas.length;
  const totalCobrado = entregas.reduce((sum, e) => sum + e.montoCobro, 0);
  const conFoto = entregas.filter((e) => e.fotoBase64).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Resumen de Operación</Text>
        <Text style={styles.subtitle}>Estado actual de tus entregas</Text>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Ionicons name="cube" size={26} color="#fff" />
            <Text style={styles.statNumber}>{totalEntregas}</Text>
            <Text style={styles.statLabel}>Entregas</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
            <Ionicons name="cash" size={26} color="#fff" />
            <Text style={styles.statNumber}>${totalCobrado.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Cobrado</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="camera" size={20} color={colors.primary} />
            <Text style={styles.infoText}>
              {conFoto} de {totalEntregas} entregas con foto de comprobante
            </Text>
          </View>
        </View>

        {totalEntregas === 0 && (
          <View style={styles.empty}>
            <Ionicons name="stats-chart-outline" size={44} color={colors.textLight} />
            <Text style={styles.emptyText}>Aún no hay datos para mostrar</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textLight, marginTop: 4, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 14 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statNumber: { fontSize: 22, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 12, color: '#fff', opacity: 0.9 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { fontSize: 13, color: colors.text, flex: 1 },
  empty: { alignItems: 'center', marginTop: 60, gap: 10 },
  emptyText: { color: colors.textLight, fontSize: 14 },
});