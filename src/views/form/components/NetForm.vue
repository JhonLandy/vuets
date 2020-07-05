<template>
    <el-form
        :ref="name"
        :model="form"
        :rules="rules"
        label-width="80px"
        @submit.native.prevent
    >
        <form-component
            v-for="config in list"
            :key="config.field.name"
            :type="config.type"
            :options="config.options"
            v-model="form[config.field.name]"
            :label="config.label"
            :prop="config.field.name"
            :multiple="config.multiple"
            :controlled="expression(config.controlled)"
        >
        </form-component>
    </el-form>
</template>
<script>
    import FormComponent from './FormComponent'

    function dataType(type)  {
        switch (true) {
            case type === 'object':
                return {}
            case  type === 'array':
                return []
            case type === 'string':
                return  ''
        }
    }
    export default {
        name: 'NetForm',
        props: {
            name: {
                type: String,
                default: ''
            },
            components: {
                type: Array,
                default: () => []
            },
            rules: {
                type: Object,
                default: () => []
            }
        },
        data() {
          return {
              form: {
                  isOpen: true
              },
              list: [],
          }
        },
        created() {
            function initData({name, type}) {
                this.$set(this.form, name, dataType(type))
                return true
            }
            // 把标记权限验证的数据（如：身份不是管理员等）进行处理
            this.list = this.components.filter(({field, permission }) => {
                return (permission
                    ? (typeof permission === 'function'
                        ? permission() : permission)
                    : true) && initData.call(this, field)
            })
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            handleSubmit() {
                this.$refs.form.validate(isPass => {
                    const data = {
                        isPass,
                        fields: {...this.form}
                    }
                    this.$emit('valid', data)
                })
            },
            expression(express) {
               return express && new Function(`
                    with(this.form) {
                        return ${express}
                    }
               `).call(this)
            }
        },
        components: {
            FormComponent
        }

    }
</script>


