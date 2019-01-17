<template>
    <div>
        <input 
            type="date" 
            :value="dateValue"
            v-on:input="e => this.$emit('onChange', this.name, e.target.value)" />
        <!-- TODO: add fallback for IE -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import moment from 'moment';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperDate',
        props: _.assign({
            format: {
                type: String,
                required: false,
                default: 'date',
            },
        }, inputProps),
        computed: {
            dateValue() {
                return moment(this.value).format('YYYY-MM-DD');
            }
        },
    }
</script>

<style lang="scss">
</style>