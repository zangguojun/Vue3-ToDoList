import { Todo } from '../types/todo'
export function saveTodos(todos: Todo[]){
    localStorage.setItem('todos_key',JSON.stringify(todos))
}

export function readTodos(){
    return JSON.parse(localStorage.getItem('todo_key') || '[]')
}
