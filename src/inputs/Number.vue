<template>
    <label class="form__number">
        <span>{{ this.label }}</span>
        <input 
            type="number" 
            v-on:input="e => this.$emit('onChange', this.name, e.target.value)"
            :value="this.value"
            :id="this.id"
            :placeholder="this.placeholder"
            :name="this.name"
            :min="this.minimum"
            :max="this.maximum"
            :readonly="this.readonly" />
    </label>
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
                required: false,
            },
            minimum: {
                Number,
                required: false,
            },
            maximum: {
                Number,
                required: false,
            },
        }, inputProps),
    }
</script>

<style lang="scss">
</style>