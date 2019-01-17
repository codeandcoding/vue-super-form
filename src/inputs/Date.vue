<template>
    <div>
        Date
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
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
    }
</script>

<style lang="scss">
</style>