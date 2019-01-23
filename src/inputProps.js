export default {
    name: {
        type: String,
        required: true,
    },
    value: {},
    label: {
        type: String,
        required: false,
    },
    validation: {
        type: Object,
        required: false,
        default: () => ({}),
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    ui: {
        type: Object,
        required: false,
        default: () => ({}),
    },
};