<template>
    <div class="form__error">
        <span v-for="(error, i) in this.errors" :key="i">
            {{ error }}
        </span>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'FieldError',
        props: {
            errors: {
                type: Array,
                required: false,
            },
        },
    }
</script>

<style scoped lang="scss">
    .form {
        &__error {
            color: red;
            padding-top: 0.5em;
        }
    }
</style>