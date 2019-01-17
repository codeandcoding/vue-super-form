<template>
    <label class="form__textarea">
        <span>{{ this.label }}</span>
        <textarea
            v-on:input="e => this.$emit('onChange', this.name, e.target.value)"
            :value="this.value"
            :id="this.id"
            :rows="this.height"
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
                required: false,
            },
            ui: {
                Object,
                required: false,
            },
        }, inputProps),
        computed: {
            height() {
                return this.ui && Object.prototype.hasOwnProperty.call(this.ui, 'height') ? 
                    this.ui.height : 
                    3;
            }
        }
    }
</script>

<style lang="scss">
</style>