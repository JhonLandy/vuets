<template>
   <div v-show="controlled">
       <el-form-item
           :label="label"
           :prop="prop"
       >
            <el-input
                v-if="type === 'input'"
                v-model="data"
                size="small"
            >
            </el-input>
            <el-radio-group
                v-if="type === 'radio'"
                v-model="data"
                size="small"
                @click.native="clickCancel"
            >
                <el-radio
                    v-for="radio in options"
                    :key="radio.value"
                    :label="radio[radio._data] || radio.value"
                >
                    {{radio.label}}
                </el-radio>
            </el-radio-group>
            <el-radio-group
                v-if="type === 'radioButton'"
                v-model="data"
                size="small"
                @click.native="clickCancel"
            >
                <el-radio-button
                    v-for="radio in options"
                    :key="radio.value"
                    :label="radio[radio._data] || radio.value"
                >
                    {{radio.label}}
                </el-radio-button>
            </el-radio-group>
            <el-checkbox-group
                v-if="type === 'checkBoxButton'"
                v-model="data"
                size="small"
                @click.native="clickCancel"
            >
                <el-checkbox-button
                    v-for="checkbox in options"
                    :key="checkbox.value"
                    :label="checkbox[checkbox._data] || checkbox.value"
                >
                    {{checkbox.label}}
                </el-checkbox-button>
            </el-checkbox-group>
            <el-select
                v-if="type === 'select'"
                v-model="data"
                :multiple="multiple"
                :loading="loading"
                :placeholder="placeholder"
                :filterable="filterable"
                size="small"
            >
                <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option[option._data] || option.value"
                >
                    {{option.label}}
                </el-option>
            </el-select>
            <el-select
                v-if="type === 'selectGroup'"
                v-model="data"
                :multiple="multiple"
                :loading="loading"
                :placeholder="placeholder"
                :filterable="filterable"
                size="small"
            >
                <el-option-group
                    v-for="group in options"
                    :key="group.value"
                    :label="group.label"
                >
                    <el-option
                        v-for="option in group.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option[option._data] || option.value"
                    >
                        {{option.label}}
                    </el-option>
                </el-option-group>
            </el-select>
            <el-input-number
                v-if="type === 'inputNumber'"
                v-model="data"
                :min="config.min" :max="config.max"
                :label="config.label"
            >
            </el-input-number>
            <el-switch
                v-if="type === 'switch'"
                v-model="data"
            >
            </el-switch>
       </el-form-item>
       <slot name="default">

       </slot>
       <slot name="switch">

       </slot>
       <slot name="radio">

       </slot>
   </div>
</template>

<script>

export default  {
    name: "FormComponent",
    props: {
        type: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Array, Object, Number, Boolean],
            default: ''
        },
        multiple: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        filterable: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => []
        },
        controlled: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            data: this.value
        }
    },
    watch: {
        data: function (value) {
            this.$emit('input', value)
        }
    },
    methods: {
        clickCancel(e) {
            const value = e.target.value
            if (value) {
                this.data = value === this.data ? '' : value
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-form {
        padding: 10px;
        .el-form-item {
            .el-select {
                width: 100%;
            }
        }
    }
</style>

