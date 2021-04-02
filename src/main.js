import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
    methods: {
        updateTodo(todo) {
            this.$emit("update-todo", todo);
        },
        removeTodo() {

        }
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
