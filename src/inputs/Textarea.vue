<template>
    <label class="form__textarea">
        <span>{{ this.label }}</span>
        <textarea
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :id="this.id"
            :rows="this.height"
            :name="this.name"
            :readonly="this.readonly">
        </textarea>
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperTextarea',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            id: {
                String,
                required: false,
            },
            ui: {
                Object,
                required: false,
            },
        },
        computed: {
            defaultValue() {
                return '';
            },
            height() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'height') ? 
                    this.ui.height : 
                    3;
            },
        },
    }
</script>

<style lang="scss">
</style>