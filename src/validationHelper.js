import FieldError from './FieldError';

function validateField(rules, value) {
    const errors = [];
    rules.map((rule) => {
        switch(rule) {     
            case 'required':
                if (!value || value.length < 1) {
                    errors.push('required_field')
                }
                break;
            case 'number':
                if (isNaN(value)) {
                    errors.push('only_number_field')
                }
                break;
            case 'minimum':
                rules.map((rule) => {
                    if (value < rule.min_value) {
                        errors.push('minimum_field')
                    }
                });
                break;
            case 'maximum': 
                rules.map((rule) => {
                    if (value > rule.max_value) {
                        errors.push('maximum_field')
                    }
                });
        }
    });

    return errors;
}

export const validationMixin = {
    components: {
        FieldError,
    },
    props: {
        rules: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            validationErrors: [],
        }
    },
    methods: {
        validate() {
            this.validationErrors = validateField(this.rules, this.inputValue);
            return this.validationErrors.length > 0;
        }
    }
}