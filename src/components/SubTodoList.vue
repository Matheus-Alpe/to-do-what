<template>
    <div class="subtodo-list">
        <ul v-if="hasSubTodo">
            <SubTodoItem
                v-for="subtodo in subTodoList"
                :subtodo="subtodo"
                :key="subtodo.id"
                @remove-subtodo="$emit('remove-subtodo', subtodo)"
                @update-subtodo="sendUpdatedSubtodo"
            />
        </ul>
        <TodoInput
            fontSize="smaller"
            @add-todo="sendAddedSubtodo"
            placeholder="add subtask"
        />
    </div>
</template>

<script>
import SubTodoItem from './SubTodoItem';
import TodoInput from './TodoInput';

export default {
    name: 'SubTodoList',

    components: {
        SubTodoItem,
        TodoInput
    },

    props: {
        subTodoList: Array
    },

    computed: {
        hasSubTodo() {
            return Boolean(this.subTodoList.length);
        },
    },

    methods: {
        sendAddedSubtodo(addedSubtodo) {
            this.$emit('add-todo', addedSubtodo);
        },
        sendUpdatedSubtodo(updatedTodo) {
            this.$emit('update-subtodo', updatedTodo);
        }
    }

}
</script>

<style lang="scss" scoped>
.subtodo-list {
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    ul {
        width: 90%;
    }
}
</style>
