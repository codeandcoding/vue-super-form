<template>
    <label class="form__date">
        <span>{{ this.label }}</span>
        <input 
            type="date"
            :value="dateValue"
            v-on:input="e => this.onChange(e.target.value)" />
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
        <!-- TODO: add fallback for IE -->
    </label>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperDate',
        mixins: [validationMixin, formSchemaMixin],
        props: {
            format: {
                type: String,
                required: false,
                default: 'date',
            },
        },
        computed: {
            defaultValue() {
                return moment().format('YYYY-MM-DD');
            },
            dateValue() {
                return moment(this.inputValue).format('YYYY-MM-DD');
            }
        },
    }
</script>

<style lang="scss">
</style>