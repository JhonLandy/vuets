<template>
    <div>
        <net-form name="form" :components="components" :rules="rules"  @valid="valid">

        </net-form>
    </div>
</template>

<script>
    import NetForm from "./components/NetForm"

    export default {
        name: 'formComponent',
        data() {
            return {
                components: [
                    {
                        field: {
                            name: 'project',
                            type: 'string'
                        },
                        type: 'select',
                        label: '项目',
                        defaultShow: true,
                        multiple: true,
                        filterable: true,
                        options: [
                            {
                                label: '大湾区',
                                value: '0'
                            },
                            {
                                label: '海珠区',
                                value: 1
                            }
                        ],
                        permission: () => {
                            return true
                        }
                    },
                    {
                        field: {
                            name: 'dc_code',
                            type: 'array'
                        },
                        type: 'selectGroup',
                        label: '区域',
                        multiple: true,
                        _data: 'label',
                        options: [
                            {
                                label: '广东',
                                options: [
                                    {
                                        label: 'guangdong',
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                label: '北京',
                                options: [
                                    {
                                        label: 'beijing',
                                        value: '1'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        field: {
                            name: 'id',
                            type: 'string'
                        },
                        type: 'input',
                        label: '实例ID',
                        controlled: 'isOpen'
                    },
                    {
                        field: {
                            name: 'isOpen',
                            type: 'string'
                        },
                        type: 'switch',
                        label: '开关'
                    },
                    {
                        field: {
                            name: 'use_case',
                            type: 'string'
                        },
                        type: 'radioButton',
                        label: '用途',
                        _data: 'value',
                        options: [
                            {
                                value: '1',
                                label: '正式'
                            },
                            {
                                value: '2',
                                label: '测试'
                            }
                        ]
                    },
                    {
                        field: {
                            name: 'status',
                            type: 'string'
                        },
                        type: 'radioButton',
                        label: '状态',
                        _data: 'label',
                        controlled: '!isOpen',
                        options: [
                            {
                                value: '3',
                                label: 'RUNNING'
                            },
                            {
                                value: '4',
                                label: 'PENDING'
                            }
                        ]
                    }
                ],
                rules: {
                    project: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    dc_code: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    id: [
                        {required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    use_case: [
                        {  required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ]
                }
            }
        },
        components: {
            NetForm
        },
        methods: {
            valid({isPass, fields}) {
                isPass && this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                console.log(fields);
            }
        }
    }
</script>
<style>
    div, input, select {
        margin: 0;
        padding: 0;
    }
</style>

