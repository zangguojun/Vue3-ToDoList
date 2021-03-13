<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <input type="checkbox" v-model="isComptete"/>
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>

<script lang='ts'>
import { defineComponent,ref,computed } from "vue";

import {Todo} from '../types/todo' 

export default defineComponent({
  name: "Item",
  props: {
    todo:{
      type: Object as () => Todo, // 函数返回的是Todo类型
      required: true,
    },
    deleteTodo:{
      type:Function,
      required:true
    },
    index:{
      type:Number,
      required:true
    },
    updateTodo:{
      type:Function,
      required:true
    }
  },
  components: {},
  setup(props){
    const myColor = ref('black')
    const bgColor = ref('white')
    const isShow = ref(false)
    const mouseHandler = (flag: boolean)=>{
      if(flag){
        myColor.value = 'green'
        bgColor.value = 'pink'
        isShow.value = true
      }else{
        myColor.value = 'black'
        bgColor.value = 'white'
        isShow.value = false
      }
    }
    const delTodo = ()=>{
      if(window.confirm("确定要删除吗？")){
        props.deleteTodo(props.index)
      }
    }
    const isComptete = computed({
      get(){
        return props.todo.isCompleted
      },
      set(val){
        props.updateTodo(props.todo,val)
      }
    })
    return{
      myColor,
      bgColor,
      mouseHandler,
      isShow,
      delTodo,
      isComptete,
    }
  }
});
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>