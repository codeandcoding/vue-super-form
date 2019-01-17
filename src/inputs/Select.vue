<template>
    <select name="month">
        <option v-for="option in items" :key="option">{{ option }}</option>
    </select>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperSelect',
        props: _.assign({
            items: {
                type: Array,
                required: true,
            },
        }, inputProps),
    }
</script>

<style lang="scss">
</style>