<template>
    <div v-if="items" class="form__checkboxes">
        <!-- multiple checkboxes -->
        <span>{{ this.label }}</span>
        <fieldset>
            <label v-for="item in selectItems" :key="item.value">
                <input
                    type="checkbox"
                    :name="name"
                    :checked="value.includes(item.value)"
                    v-on:input="e => onChange(item.value, e.target.checked)" />
                <span>{{ item.label }}</span>
            </label>
        </fieldset>
    </div>
    <label v-else class="form__checkbox">
        <!-- single checkbox -->
        <input 
            type="checkbox" 
            :name="name" 
            v-on:input="e => onChange(null, e.target.checked)" />
        <span>{{ this.label }}</span>
    </label>
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
                required: false,
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
                const value = val ? this.getMultiValues(val, checked) : checked;

                this.$emit('onChange', this.name, value);
            },
            getMultiValues(val, checked) {
                const values = this.value ? this.value.splice(0) : [];

                if (checked) {
                    values.push(val);
                } else {
                    const index = values.indexOf(val);
                    if (index > -1) {
                        values.splice(index, 1)
                    }
                }

                return _.uniq(values);
            }
        }
    }
</script>

<style lang="scss">
</style>