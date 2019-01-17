<template>
    <div>
        <label v-for="item in selectItems" :key="item.value">
            <input
                type="radio"
                :name="item.label"
                v-on:input="e => onChange(item.value)" />
            <span>{{ item.label }}</span>
        </label>
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperRadio',

        props: _.assign({
            items: {
                type: Array,
                required: true,
            },
        }, inputProps),

        computed: {
            selectItems() {               
                return this.items.map(item => ({
                    value: item,
                    label: item,
                }));
            }
        },

        methods: {
            onChange(value) {
                this.$emit('onChange', this.name, value);
            }
        }
    }
</script>

<style lang="scss">
</style>