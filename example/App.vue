<template>
    <div class="wrapper">
        <pre>
            {{ formData }}
        </pre>
        <div>
            <super-form 
                ref="form" 
                v-on:submitted="submitForm" 
                :schema="exampleSchema" 
                v-model="formData" 
                :translations="translations" 
                :render="renderFuncs"
                :renderOption="renderOptionsFuncs"/>
            <input type="submit" value="Submit form" @click="onClickSubmit" />
        </div>
    </div>
</template>

<script>
    import exampleSchema from './example.json';
    import translations from './en.json';

    export default {
        name: 'App',
        data () {
            return {
                exampleSchema,
                formData: {
                    name: 'John Doe',
                    numberSelect: 2,
                    checkboxes: [
                        'foo', 'fuzz'
                    ],
                    numberRadio: 1,
                    birthdate: '2018/12/01',
                    published: true,
                },
                translations: translations.forms,
            }
        },
        computed: {
            renderOptionsFuncs() {
                return {
                    choice: val => {
                        return `<b>${val.label}</b></br><small>with extra</small>`;
                    }
                }
            },
            renderFuncs() {
                return {
                    choice: val => {
                        return `<b>${val}</b> is selected`;
                    }
                }
            }
        },
        mounted() {
            console.log('example app mounted!');
        },
        methods: {
            submitForm(data) {
                console.log('form submitted!', data)
            },
            onClickSubmit(e) {
                e.preventDefault();
                this.$refs.form.submitForm()
            }
        },
    };
</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100%;
        width: 80%;
        margin: 0 auto;
        overflow: hidden;

        > * {
            flex: 1;
        }

        > pre {
            flex: 0.5;
        }

        > div {
            overflow: auto;

            input[type=submit] {
                margin: 1em 0 2em;
            }
        }
    }
</style>