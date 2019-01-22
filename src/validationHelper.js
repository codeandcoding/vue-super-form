import FieldError from './FieldError';

function validateField(rules, value) {
    const errors = [];
    Object.keys(rules).map(rule => {
        switch(rules[rule]) {
            case 'required':
                if (!value || value.length < 1) {
                    errors.push('required_field')
                }
                break;
            case 'number':
                if (isNaN(value)) {
                    errors.push('only_number_field')
                }
                if (rules.minimum) {
                    if (value < rules.min_value) {
                        errors.push('minimum_field');
                    }
                }
                if (rules.maximum) {
                    if (value > rules.max_value) {
                        errors.push('maximum_field')
                    }
                }
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
            type: Object,
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