<template>
    <label class="form__text">
        <span>{{ this.label }}</span>
        <input 
            v-on:input="e => this.onChange(e.target.value)" 
            :value="inputValue"
            type="text"
            :id="this.id"
            :placeholder="placeholder"
            :name="this.name" />
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperText',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            id: {
                String,
                required: false
            }
        },
        computed: {
            defaultValue() {
                return '';
            },
        },
    }
</script>

<style lang="scss">
</style>