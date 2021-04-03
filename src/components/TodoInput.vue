<template>
    <div @click="focusInput">
        <input
            :class="fontSize"
            type="text"
            :placeholder="placeholder"
            @keyup.enter="emitTodo"
            ref="input"
        >
    </div>
</template>

<script>
export default {
    name: 'TodoInput',

    props: {
        fontSize: String,
        placeholder: String
    },

    methods: {
        emitTodo({ target }) {
            if (!target.value) {
                return;
            }
            this.$emit('add-todo', target.value);
            target.value = '';
        },

        focusInput() {
            this.$refs.input.focus();
        }
    },
}
</script>

<style lang="scss" scoped>
div {
    background: white;
    padding:  10px 10px 7px;
    width: 80%;
    border-radius: 30px;
    margin: 2px 0 3px;
    overflow: hidden;

    input {
        text-align: center;
        background-color: transparent;
        outline: none;
        display: block;
        border: none;
        width: 100%;
        height: 50%;
        box-shadow: 0 30px 40px 0px rgba(51, 51, 51, 0.329);

        &::placeholder {
            opacity: .3;
        }

        &.bigger {
            font-size: 1.2rem;
        }

        &.smaller {
            font-size: .9rem;
        }
    }
}
</style>
