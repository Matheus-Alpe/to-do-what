<template>
    <ul class="todo-list">
      
        <TodoItem 
            v-for="todo in todoList"
            :todoItem="todo"
            :key="todo.id"
            @remove-todo="$emit('remove-todo', todo)"
            @update-todo="sendUpdatedTodo"
        />

    </ul>
</template>

<script>
import TodoItem from './TodoItem'

export default {
    name: 'TodoList',
    components: {
        TodoItem,
    },
    props: {
        todoList: Array
    },
    methods: {
        sendUpdatedTodo(updatedTodo) {
            this.$emit('update-todo', updatedTodo);
        }
    }
}
</script>