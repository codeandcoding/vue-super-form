<template>
    <label class="form__textarea">
        <span>{{ this.label }}</span>
        <textarea
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :maxlength="maxLength"
            :id="this.id"
            :rows="this.height"
            :name="this.name"
            :readonly="this.readonly">
        </textarea>
        <span>{{ getTextCount }}</span>
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
            maxLength() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'maxLength') ?
                    this.ui.maxLength :
                    null;
            },
            getTextCount() {
                return this.maxLength &&
                    `${this.value ? this.value.length : 0}/${this.maxLength}`;
            },
        },
    }
</script>

<style lang="scss">
</style>