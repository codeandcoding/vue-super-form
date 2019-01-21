<template>
    <label class="form__number">
        <span>{{ this.label }}</span>
        <input 
            type="number" 
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :id="this.id"
            :placeholder="this.placeholder"
            :name="this.name"
            :min="this.minimum"
            :max="this.maximum"
            :readonly="this.readonly" />
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperNumber',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            id: {
                String,
                required: false,
            },
            minimum: {
                Number,
                required: false,
            },
            maximum: {
                Number,
                required: false,
            },
        },
        computed: {
            defaultValue() {
                return this.minimum || 0;
            }
        },
    }
</script>

<style lang="scss">
</style>