<template>
    <div>
        <span>{{ this.label }}</span>
        <label>
            <span :class="switchClass"
                v-on:click="e => this.onChange(!this.value)"
            />
        </label>
    </div>
</template>

<script>
    import Vue from 'vue';
    import _ from 'lodash';
    import inputProps from '../inputProps';

    export default {
        name: 'SuperSwitch',
        props: inputProps,

        computed: {
            switchClass() {           
                return this.value ?
                    'form__switch' : 'form__switch form__switch--off';
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
        .form {
            &__switch {
                background-color: green;
                border-radius: 25px;
                width: 75px;
                height: 20px;

                &--off {
                    background-color: red;
                }
            }
    }
</style>