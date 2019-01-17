<template>
    <label>
        {{ this.label }}
        <textarea 
            v-on:input="e => this.$emit('onChange', this.name, e.target.value)" 
            :value="this.value"
            :id="this.id"
            :rows="this.rows"
            :cols="this.cols"
            :name="this.name"
            :readonly="this.readonly">
        </textarea> 
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperTextarea',
        props: _.assign({
            id: {
                String,
                required: false
            }, 
            rows: {
                Number,
                required: false
            },
            cols: {
                Number,
                required: false
            },
        }, inputProps),
    }
</script>

<style lang="scss">
</style>