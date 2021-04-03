<template>
    <ul class="todo-list">

        <TodoItem
            v-for="todo in todoList"
            :todoItem="todo"
            :key="todo.id"
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
}
</script>
