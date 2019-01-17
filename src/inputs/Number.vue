<template>
    <div class="number">
        <label>{{ this.label }}</label>
        <input type="number" v-on:input="e => this.$emit('onChange', this.name, e.target.value)" 
        :value="this.value" 
        :id="this.id" 
        :placeholder="this.placeholder"
        :name="this.name"
        :min="this.minimum"
        :max="this.maximum"
        :readonly="this.readonly"/> 
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperNumber',
        props: _.assign({
            id: {
                String,
                required: true
            },
            minimum: {
                Number,
                required: false
            },
            maximum: {
                Number,
                required: false
            },
        }, inputProps),
    }
</script>

<style lang="scss">
</style>