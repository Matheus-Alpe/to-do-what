<template>
    <li class="todo-option">
        <div
            class="todo-item"
            :class="{ completed: (todo.completed || allSubTodosCompleted) }"
            @click.stop="showOption = !showOption"
        >
            <div class="checkbox">
                <input
                    v-if="!hasSubTodo"
                    type="checkbox"
                    v-model="todo.completed"
                    @change="emitUpdateTodo"
                />
                <span
                    v-else
                    class="collapse"
                    :class="{ 'collapse-open': showOption }"
                    @click.stop="showOption = !showOption"
                >
                    <i class="fas fa-angle-right"></i>
                </span>
            </div>
            <p>
                {{ todo.description }}
            </p>
            <div class="btn-remove" @click.stop="emitRemoveTodo">
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>

        <div v-if="showOption">
            <SubTodoList
                :subtodos="todo.subTodos"
                @remove-subtodo="removeSubtodo"
                @update-subtodo="updateSubtodo"
                @add-todo="addSubtodo"
            />
        </div>
    </li>
</template>

<script>
import { eventBus } from '../main';

import SubTodoList from './SubTodoList';


export default {
    name: 'TodoItem',
    components: {
        SubTodoList
    },
    props: {
        todoItem: Object,
    },

    data() {
        return {
            showOption: false,
            todo: { ...this.todoItem },
        };
    },

    computed: {
        hasSubTodo() {
            return Boolean(this.todo.subTodos[0]);
        },

        allSubTodosCompleted() {
            return this.todo.subTodos.length && !this.todo.subTodos.find((subtodo) => subtodo.completed === false)
        }
    },

    watch: {
        'todo.subTodos': function (newTodoList) {
            if (newTodoList.length) {
                this.todo.completed = false;
                this.emitUpdateTodo();
            }
        }
    },

    methods: {
        emitUpdateTodo(event) {
            if (event && event.target.type === 'checkbox') {
                this.showOption = false;
            }
            eventBus.updateTodo(this.todo);
        },

        emitRemoveTodo() {
            eventBus.removeTodo(this.todo);
        },

        getValidId() {
            const d = new Date();
            const dateId = d.toLocaleString();
            return dateId + d.getMilliseconds() * this.todo.subTodos.length + 2;
        },

        addSubtodo(value) {
            this.todo.subTodos.push({
                id: this.getValidId(),
                description: value,
                completed: false,
                isSubTodo: true,
            });

            this.emitUpdateTodo();
        },

        updateSubtodo(updatedSubtodo) {
            const index = this.todo.subTodos.findIndex(
                (subtodo) => subtodo.id === updatedSubtodo.id
            );
            this.todo.subTodos.splice(index, 1, updatedSubtodo);

            this.emitUpdateTodo();
        },

        removeSubtodo(removeSubtodo) {
            const index = this.todo.subTodos.findIndex((subtodo) => subtodo.id === removeSubtodo.id);
            this.todo.subTodos.splice(index, 1);

            this.emitUpdateTodo();
        },
    },
};
</script>

<style lang="scss">
li {
    list-style: none;

    &.todo-option {
        margin-bottom: 5px;
    }

    .todo-item {
        display: grid;
        justify-content: center;
        align-items: center;
        min-height: 2em;
        grid-template-columns: 30px 1fr 25px;
        background-color: rgba(150, 150, 150, 0.664);
        border-radius: 15px;
        overflow: hidden;
        position: relative;

        &.completed {
            background-color: rgba(116, 146, 104, 0.712);
        }

        p {
            cursor: default;
            padding: 10px 0;
        }

        i {
            font-size: 13px;
        }

        .checkbox {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .collapse {
                cursor: pointer;
                transition: all .3s;
            }

            .collapse-open {
                transform: rotateZ(90deg);
            }
        }


        .btn-remove {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: rgba(255, 0, 0, 0.158);

            transition: all .3s;

            &:hover {

                background-color: rgba(255, 0, 0, 0.342);
            }
        }
    }
}
</style>
