<template>
    <label :class="labelClass">
        <span>{{ this.label }}</span>
        <input 
            v-on:input="e => this.onChange(e.target.value)" 
            :value="inputValue"
            :disabled="readOnly"
            :type="type"
            :id="this.id"
            :placeholder="placeholder"
            :name="this.name" />
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
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
            labelClass() {
                const className = 'form__text';
                return this.readOnly ? `${ className } ${ className }--disabled` : className;
            },
            defaultValue() {
                return '';
            },
            type() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'type') ?
                    this.ui.type : null;
            }
        },
    }
</script>

<style lang="scss">
</style>