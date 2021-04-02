<template>
    <li id="subtodo">
        <div class="todo-item" :class="{ completed: subtodo.completed }">
            <div class="checkbox">
                <input
                    type="checkbox"
                    v-model="subtodo.completed"
                    @change="sendUpdatedTodo"
                />
            </div>
            <p>
                {{ subtodo.description }}
            </p>
            <div class="btn-remove" @click="$emit('remove-subtodo')">
                x
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SubTodoItem',
    props: {
        subtodo: Object
    },

    methods: {
        sendUpdatedTodo() {
            this.$emit("update-subtodo", this.subtodo);
        },
    }
}
</script>

<style lang="scss" scoped>
li {
    width: 100%;
    margin-top: 2px;

    .todo-item {
        background-color: rgba(167, 167, 167, 0.548);
    }
}
</style>