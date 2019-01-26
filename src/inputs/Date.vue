<template>
    <div class="form__date">
        <span>{{ this.label }}</span>
        <datepicker v-on:input="change" :value="dateValue" />
        <field-error :errors="this.validationErrors" :translations="this.validationLabels" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import Datepicker from 'vuejs-datepicker';
    import { validationMixin } from '../validationHelper';
    import { formSchemaMixin } from '../schemaHelper';

    export default {
        name: 'SuperDate',
        mixins: [validationMixin, formSchemaMixin],
        components: {
            Datepicker,
        },
        props: {
            format: {
                type: String,
                required: false,
                default: 'date',
            },
            dateFormat: {
                type: String,
                required: false,
                default: 'YYYY-MM-DD',
            }
        },
        computed: {
            defaultValue() {
                return moment().format('YYYY-MM-DD');
            },
            dateValue() {
                return moment(this.inputValue).format('YYYY-MM-DD');
            }
        },
        methods: {
            change(newDate) {
                const date = moment(newDate);
                this.onChange(date.format(this.dateFormat))
            }
        },
    }
</script>

<style lang="scss">
</style>