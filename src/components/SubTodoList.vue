<template>
    <div class="subtodo-list">
        <ul v-if="hasSubTodo">
            <SubTodoItem
                v-for="subtodo in subtodos"
                :subtodoItem="subtodo"
                :key="subtodo.id"
                @remove-subtodo="emitRemoveSubtodo"
                @update-subtodo="emitUpdateSubtodo"
            />
        </ul>
        <TodoInput
            fontSize="smaller"
            @add-todo="emitAddSubtodo"
            placeholder="add subtask"
        />
    </div>
</template>

<script>
import SubTodoItem from './SubTodoItem';
import TodoInput from './TodoInput';

export default {
    name: 'SubtodoList',

    components: {
        SubTodoItem,
        TodoInput
    },

    props: {
        subtodos: Array
    },

    computed: {
        hasSubTodo() {
            return Boolean(this.subtodos.length);
        },
    },

    methods: {
        emitAddSubtodo(addedSubtodo) {
            this.$emit('add-todo', addedSubtodo);
        },
        emitUpdateSubtodo(updatedSubtodo) {
            this.$emit('update-subtodo', updatedSubtodo);
        },
        emitRemoveSubtodo(removeSubtodo) {
            this.$emit('remove-subtodo', removeSubtodo);
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
