import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SqlComponents() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState('');
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
        'SELECT sqlite_version()'
      );
      if (result) {
        setVersion(result['sqlite_version()']);
      }
    }
    setup();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  value: string;
  intValue: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>('SELECT * FROM todos');
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {todos.map((todo, index) => (
        <View style={styles.todoItemContainer} key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const userVersionResult = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  let currentDbVersion = userVersionResult ? userVersionResult.user_version : 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  headerContainer: {
    padding: 16,
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
  },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    todoItemContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoItemText: {
        fontSize: 16,
    },

});
