<template>
    <div>
        <label v-for="item in selectItems" :key="item.value">
            <input
                :name="name"
                :checked="value.includes(item.value)"
                v-on:input="e => onChange(item.value, e.target.checked)"
                type="checkbox" />
            <span>{{ item.label }}</span>
        </label>
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperCheckbox',
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
            onChange(val, checked) {
                const values = this.value ? this.value.splice(0) : [];

                if (checked) {
                    values.push(val);
                } else {
                    const index = values.indexOf(val);
                    if (index > -1) {
                        values.splice(index)
                    }
                }

                this.$emit('onChange', this.name, _.uniq(values));
            }
        }
    }
</script>

<style lang="scss">
</style>