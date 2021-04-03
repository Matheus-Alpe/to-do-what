<template>
    <li id="subtodo">
        <div class="todo-item" :class="{ completed: subtodo.completed }">
            <div class="checkbox">
                <input
                    type="checkbox"
                    v-model="subtodo.completed"
                    @change="emitUpdateSubtodo"
                />
            </div>
            <p>
                {{ subtodo.description }}
            </p>
            <div class="btn-remove" @click="emitRemoveSubtodo">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SubTodoItem',

    props: {
        subtodoItem: Object
    },

    data() {
        return {
            subtodo: { ...this.subtodoItem }
        }
    },

    methods: {
        emitUpdateSubtodo() {
            this.$emit('update-subtodo', this.subtodo);
        },
        emitRemoveSubtodo() {
            this.$emit('remove-subtodo', this.subtodo);
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    width: 100%;
    margin-top: 2px;

    .todo-item {
        background-color: rgba(167, 167, 167, 0.548);

        i {
            font-size: 10px;
        }
    }
}
</style>
