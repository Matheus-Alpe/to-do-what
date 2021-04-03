import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
    methods: {
        addTodo(todo) {
            this.$emit("add-todo", todo);
        },
        updateTodo(todo) {
            this.$emit("update-todo", todo);
        },
        removeTodo(todo) {
            this.$emit('remove-todo', todo);
        },
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app');
