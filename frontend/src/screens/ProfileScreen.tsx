import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="leaf" size={40} color="#fff" />
        </View>
        <Text style={styles.name}>Repartidor EcoLogistics</Text>
        <Text style={styles.role}>Operador de Entregas</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>repartidor@ecologistics.com</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>+593 984 127 670</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>Zona Norte, Quito</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="earth-outline" size={16} color={colors.textLight} />
        <Text style={styles.footerText}>Comprometidos con entregas sostenibles</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  name: { fontSize: 19, fontWeight: '700', color: colors.text },
  role: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  infoText: { fontSize: 14, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: { fontSize: 12, color: colors.textLight },
});