<template>
    <label class="form__text">
        <span>{{ this.label }}</span>
        <input 
            v-on:input="e => this.$emit('onChange', this.name, e.target.value)" 
            :value="this.value"
            :type="this.type" 
            :id="this.id" 
            :placeholder="this.placeholder"
            :name="this.name" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperText',
        props: _.assign({
            id: {
                String,
                required: false
            }, 
            type: {
                // The value must match one of these strings
                validator: value => ['text', 'password'].indexOf(value) !== -1,
            }
        }, inputProps),
    }
</script>

<style lang="scss">
</style>