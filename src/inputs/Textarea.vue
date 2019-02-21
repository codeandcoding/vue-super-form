<template>
    <label class="form__textarea">
        <span>{{ this.label }}</span>
        <textarea
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :maxlength="maxlength"
            :id="this.id"
            :rows="this.height"
            :name="this.name"
            :readonly="this.readonly">
        </textarea>
        <span>{{ this.ui.maxlength && getTextCount }}</span>
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
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
            maxlength() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'maxlength') &&
                    this.ui.maxlength
            },
            getTextCount() {
                    return `${this.value.length}/${this.maxlength}`
            },
        },
    }
</script>

<style lang="scss">
</style>