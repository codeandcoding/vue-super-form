<template>
    <label class="form__date">
        <span>{{ this.label }}</span>
        <input 
            type="date" 
            :value="dateValue"
            v-on:input="e => this.onChange(e.target.value)" />
        <field-error :errors="this.validationErrors" />
        <!-- TODO: add fallback for IE -->
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import moment from 'moment';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperDate',
        mixins: [validationMixin],
        props: _.assign({
            format: {
                type: String,
                required: false,
                default: 'date',
            },
        }, inputProps),
        data() {
            return {
                inputValue: this.value,
            }
        },
        computed: {
            dateValue() {
                return moment(this.inputValue).format('YYYY-MM-DD');
            }
        },
        methods: {
            onChange(value) {
                this.inputValue = value;
                this.$emit('onChange', this.name, value);
            },
        }
    }
</script>

<style lang="scss">
</style>