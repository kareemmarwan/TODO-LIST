import React from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { Colors } from "react-native/Libraries/NewAppScreen"
const COLORS = { primary: "#1D3557", white: "#fff" }

const App = () => {
  const [todos, setTodos] = React.useState([])
  const [textInput, setTextInput] = React.useState("")

  const addTodo = () => {
    if (textInput == "") {
      Alert.alert("Error", "Please input todo")
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      }
      setTodos([...todos, newTodo])
      setTextInput("")
    }
  }

  const markTodoComplete = (todoId) => {
    const newTodosItem = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true }
      }
      return item
    })

    setTodos(newTodosItem)
  }

  const deleteTodo = (todoId) => {
    const newTodosItem = todos.filter((item) => item.id != todoId)
    setTodos(newTodosItem)
  }

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? "line-through" : "none",
            }}>
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={[styles.actionIcon, { backgroundColor: "green" }]}>
              <Icon name='done' size={20} color='white' />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name='delete' size={20} color='white' />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.white,
            marginTop: 20,
          }}>
          TODO APP
        </Text>
      </View>
      {todos.length < 1 ? (
        <View
          style={{
            height: "80%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontWeight: "700", color: Colors.primary }}>
            Not today
          </Text>
          <Text style={{ color: "green" }}>There is nothing to do today</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={todos}
          renderItem={({ item }) => <ListItem todo={item} />}
        />
      )}

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder='Add Todo'
            onChangeText={(text) => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name='add' color='white' size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: "#A8DADC",
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    height: 100,
    padding: 20,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
})

export default App
