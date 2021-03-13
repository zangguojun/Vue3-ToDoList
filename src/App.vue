<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header
        :addTodo="addTodo"
      />
      <List 
        :todos="todos"
        :deleteTodo="deleteTodo"
        :updateTodo="updateTodo"
      />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllChecked="clearAllChecked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs, watch } from "vue";
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

import {Todo} from './types/todo'
import {readTodos ,saveTodos} from './utils/localStorageUtils'

export default defineComponent({
  name: "App",
  components: {
    Header,
    List,
    Footer
  },
  setup(){
    // const status = reactive<{todos: Todo []}>({
    //   todos:[
    //     {id:1,title:'AAA',isCompleted:false},
    //     {id:2,title:'BBB',isCompleted:true},
    //     {id:3,title:'CCC',isCompleted:false},
    //   ]
    // })
    const status = reactive<{todos: Todo []}>({
      todos:[]
    })
    onMounted(()=>{
      setTimeout(()=>{
        status.todos = readTodos()
      },1000)
    })

    const addTodo = (todo: Todo)=>{
      status.todos.unshift(todo)
    }
    const deleteTodo = (index: number)=>{
      status.todos.splice(index,1)
    }
    const updateTodo = (todo: Todo,isComplete: boolean)=>{
      todo.isCompleted = isComplete
    }
    const checkAll = (isComplete: boolean)=>{
      status.todos.forEach(todo => {
        todo.isCompleted = isComplete
      });
    }
    const clearAllChecked = ()=>{
      status.todos = status.todos.filter(todo => !todo.isCompleted)
    }

    // watch(()=>status.todos,(value)=>{
    //   saveTodos(value)
    // },{deep:true})
    watch(()=>status.todos,saveTodos,{deep:true})


    return{
      ...toRefs(status),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllChecked,
    }
  }
});
</script>

<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

