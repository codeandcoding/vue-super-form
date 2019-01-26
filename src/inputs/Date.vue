<template>
    <div class="form__date">
        <span>{{ this.label }}</span>
        <datepicker v-on:input="change" :value="dateValue" :format="displayFormat" />
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
            outputFormat: {
                type: String,
                required: false,
                default: 'YYYY-MM-DD',
            },
            displayFormat: {
                type: String,
                required: false,
                default: 'dd/MM/yyyy',
            }
        },
        computed: {
            defaultValue() {
                return moment().format(this.outputFormat);
            },
            dateValue() {
                return moment(this.inputValue, this.outputFormat).format('YYYY-MM-DD');
            }
        },
        methods: {
            change(newDate) {
                const date = moment(newDate);
                this.onChange(date.format(this.outputFormat))
            }
        },
    }
</script>

<style lang="scss">
</style>