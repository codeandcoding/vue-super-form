<template>
    <div class="text">
        <label>{{ this.label }}</label>
        <input v-model="superText"
        :type="this.type" 
        :id="this.id" 
        :placeholder="this.placeholder"
        :name="this.name" 
        :value="this.value"/> 
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperText',
        data() {
            return {
                superText,
            };
        },
        props: _.assign({
            id: {
                String,
                required: false
            }, 
            value: {
                String,
                required: false
            },
            type: {
                validator: function (value) {
                    // The value must match one of these strings
                    return ['text', 'password'].indexOf(value) !== -1
                }
            }
        }, inputProps),
    }
</script>

<style lang="scss">
</style>