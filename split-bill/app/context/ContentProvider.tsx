    // import { useSQLiteContext } from 'expo-sqlite';
    // import { useEffect, useState } from 'react';
    // import { View, Text } from 'react-native';

    // function Content() {
    //   const db = useSQLiteContext();
    //   const [todos, setTodos] = useState([]);

    //   useEffect(() => {
    //     async function loadTodos() {
    //       const result = await db.getAllAsync('SELECT * FROM todos;');
    //       setTodos(result);
    //     }
    //     loadTodos();
    //   }, [db]);

    //   return (
    //     <View>
    //       <Text>Todos:</Text>
    //       {todos.map(todo => (
    //         <Text key={todo.id}>{todo.title} - {todo.completed ? 'Completed' : 'Pending'}</Text>
    //       ))}
    //     </View>
    //   );
    // }