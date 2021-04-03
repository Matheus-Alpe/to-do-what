<template>
    <div id="app" class="app" :class="{ 'align-center': hasNoTodo }">
        <header class="header">
            <div class="header-info">
                <i class="fas fa-clipboard-list"></i>
                <h2>To do What?</h2>
            </div>
            <TodoInput
                @add-todo="addTodo"
                font-size="bigger"
                class="main-input"
                placeholder="type something to do"
            />
        </header>

        <TodoList :todoList="todoList" />
    </div>
</template>

<script>
import { eventBus } from "./main";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const appStorage = window.localStorage;

export default {
    name: "App",
    components: {
        TodoInput,
        TodoList
    },
    data() {
        return {
            todoList: []
        };
    },

    computed: {
        hasNoTodo() {
            return !this.todoList.length;
        }
    },

    methods: {
        getValidId() {
            const d = new Date();
            const dateId = d.toLocaleString();
            return dateId + d.getMilliseconds() * this.todoList.length;
        },

        addTodo(value) {
            this.todoList.push({
                id: this.getValidId(),
                description: value,
                completed: false,
                subTodos: []
            });

            this.updateLocalStorage();
        },

        updateTodo(updatedTodo) {
            const index = this.todoList.findIndex(
                todo => todo.id === updatedTodo.id
            );
            this.todoList.splice(index, 1, updatedTodo);
            this.updateLocalStorage();
        },

        removeTodo(removeTodo) {
            const index = this.todoList.findIndex(
                todo => todo.id === removeTodo.id
            );
            this.todoList.splice(index, 1);
            this.updateLocalStorage();
        },

        updateLocalStorage() {
            appStorage.setItem("todoList", JSON.stringify(this.todoList));
        }
    },

    created() {
        this.todoList = JSON.parse(appStorage.getItem("todoList")) || [];
    },

    mounted() {
        eventBus.$on("add-todo", this.addTodo);
        eventBus.$on("update-todo", this.updateTodo);
        eventBus.$on("remove-todo", this.removeTodo);
    }
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    animation: rainbow 60s infinite;
    height: 100vh;
    position: relative;
}

.app {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 95%;
    max-width: 700px;
    transition: all 1s ease-out;

    .header {
        margin: 20px;

        .header-info {
            max-width: 40%;
            margin: 0 auto 40px;
            display: grid;
            text-align: center;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            justify-items: center;

            i {
                font-size: 70px;
                opacity: 0.8;
            }

            h2 {
                justify-self: flex-start;
                font-size: 2rem;
                opacity: 0.8;
                font-family: Arial, Helvetica, sans-serif;
            }

            @media screen and (max-width: 525px) {
                max-width: 80%;
            }
        }
    }

    .main-input {
        width: 100%;
        margin: 0px auto 30px;
    }

    input[type="checkbox"] {
        cursor: pointer;
    }
}

.app.align-center {
    top: 50%;
    transform: translate(-50%, -50%);
}

@keyframes rainbow {
    0% {
        background-color: rgba(31, 156, 160, 0.404);
    }

    20% {
        background-color: rgba(137, 43, 226, 0.3);
    }

    40% {
        background-color: rgba(37, 160, 53, 0.3);
    }

    60% {
        background-color: rgba(221, 236, 0, 0.3);
    }

    80% {
        background-color: rgba(0, 83, 236, 0.3);
    }

    100% {
        background-color: rgba(31, 156, 160, 0.404);
    }
}
</style>
