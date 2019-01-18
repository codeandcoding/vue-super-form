<template>
    <label class="form__textarea">
        <span>{{ this.label }}</span>
        <textarea
            v-on:input="e => this.onChange(e.target.value)"
            :value="inputValue"
            :id="this.id"
            :rows="this.height"
            :name="this.name"
            :readonly="this.readonly">
        </textarea>
        <field-error :errors="this.validationErrors" />
    </label>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';
    import { validationMixin } from '../validationHelper';

    export default {
        name: 'SuperTextarea',
        mixins: [validationMixin],
        props: _.assign({
            id: {
                String,
                required: false,
            },
            ui: {
                Object,
                required: false,
            },
        }, inputProps),
        data() {
            return {
                inputValue: this.value,
            }
        },
        computed: {
            height() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'height') ? 
                    this.ui.height : 
                    3;
            },
        },
        methods: {
            onChange(value) {
                this.inputValue = value;
                this.$emit('onChange', this.name, value);
            },
        },
    }
</script>

<style lang="scss">
</style>