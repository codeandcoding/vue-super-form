<template>
    <div class="form__error" v-if="errors.length">
        <span v-for="(label, i) in this.errorLabels" :key="i">
            {{ label }}
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
                default: () => [],
            },
            translations: {
                type: Object,
                required: false,
                default: () => ({}),
            },
        },
        computed: {
            errorLabels() {
                return this.errors.map(e => this.translations[e]);
            }
        }
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