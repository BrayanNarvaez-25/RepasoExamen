import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Entrega,
  initDatabase,
  obtenerEntregasLocal,
  insertarEntregaLocal,
  actualizarEntregaLocal,
  eliminarEntregaLocal,
} from '../database/db';

const API_URL = 'http://192.168.1.34:3000';

interface EntregaContextType {
  entregas: Entrega[];
  cargarEntregas: () => Promise<void>;
  guardarEntrega: (entrega: Omit<Entrega, 'id'>, id?: number) => Promise<void>;
  eliminarEntrega: (id: number) => Promise<void>;
}

const EntregaContext = createContext<EntregaContextType | undefined>(undefined);

export function EntregaProvider({ children }: { children: ReactNode }) {
  const [entregas, setEntregas] = useState<Entrega[]>([]);

  useEffect(() => {
    initDatabase();
    cargarEntregas();
  }, []);

  async function cargarEntregas() {
    // Siempre cargamos primero de SQLite para que la app funcione offline
    const local = obtenerEntregasLocal();
    setEntregas(local);

    // Intentamos sincronizar con el backend si hay conexión
    try {
      const res = await fetch(`${API_URL}/entregas`);
      if (res.ok) {
        const remotas = await res.json();
        setEntregas(remotas);
      }
    } catch (error) {
      console.log('Sin conexion al backend, usando datos locales (offline).');
    }
  }

  async function guardarEntrega(entrega: Omit<Entrega, 'id'>, id?: number) {
    // Guardamos siempre localmente primero
    if (id) {
      actualizarEntregaLocal({ ...entrega, id });
    } else {
      insertarEntregaLocal(entrega);
    }

    // Intentamos sincronizar con el backend
    try {
      if (id) {
        await fetch(`${API_URL}/entregas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entrega),
        });
      } else {
        await fetch(`${API_URL}/entregas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entrega),
        });
      }
    } catch (error) {
      console.log('Sin conexion al backend, entrega guardada solo localmente.');
    }

    await cargarEntregas();
  }

  async function eliminarEntrega(id: number) {
    eliminarEntregaLocal(id);

    try {
      await fetch(`${API_URL}/entregas/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.log('Sin conexion al backend, eliminado solo localmente.');
    }

    await cargarEntregas();
  }

  return (
    <EntregaContext.Provider value={{ entregas, cargarEntregas, guardarEntrega, eliminarEntrega }}>
      {children}
    </EntregaContext.Provider>
  );
}

export function useEntregas() {
  const context = useContext(EntregaContext);
  if (!context) {
    throw new Error('useEntregas debe usarse dentro de un EntregaProvider');
  }
  return context;
}