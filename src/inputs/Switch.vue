<template>
    <div class="form__switch">
        <span>{{ this.label }}</span>
        <br/>
        <label v-for="item in selectItems" :key="item.value">
            <input
                type="radio"
                :name="name"
                :id="item.label"
                :checked="value == item.value"
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
        name: 'SuperSwitch',
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