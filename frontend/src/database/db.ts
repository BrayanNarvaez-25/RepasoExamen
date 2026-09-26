import * as SQLite from 'expo-sqlite';

export interface Entrega {
  id: number;
  guia: string;
  destinatario: string;
  montoCobro: number;
  fotoBase64: string | null;
  fecha: string;
}

const db = SQLite.openDatabaseSync('ecologistics.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guia TEXT NOT NULL,
      destinatario TEXT NOT NULL,
      montoCobro REAL NOT NULL,
      fotoBase64 TEXT,
      fecha TEXT NOT NULL
    );
  `);
}

export function obtenerEntregasLocal(): Entrega[] {
  return db.getAllSync<Entrega>('SELECT * FROM entregas ORDER BY id DESC;');
}

export function insertarEntregaLocal(entrega: Omit<Entrega, 'id'>) {
  db.runSync(
    'INSERT INTO entregas (guia, destinatario, montoCobro, fotoBase64, fecha) VALUES (?, ?, ?, ?, ?);',
    [entrega.guia, entrega.destinatario, entrega.montoCobro, entrega.fotoBase64, entrega.fecha]
  );
}

export function actualizarEntregaLocal(entrega: Entrega) {
  db.runSync(
    'UPDATE entregas SET guia = ?, destinatario = ?, montoCobro = ?, fotoBase64 = ?, fecha = ? WHERE id = ?;',
    [entrega.guia, entrega.destinatario, entrega.montoCobro, entrega.fotoBase64, entrega.fecha, entrega.id]
  );
}

export function eliminarEntregaLocal(id: number) {
  db.runSync('DELETE FROM entregas WHERE id = ?;', [id]);
}

export default db;