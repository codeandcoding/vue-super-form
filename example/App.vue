<template>
    <div>
        <super-form :schema="exampleSchema" />
    </div>
</template>

<script>
    import exampleSchema from './example.json';

    export default {
        name: 'App',
        data () {
            return {
                exampleSchema,
            }
        },
        mounted() {
            console.log('example app mounted!');
        }
    };
</script>

<style lang="scss">
</style>