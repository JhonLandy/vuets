<template>
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">

        <el-form-item v-for="item in feilds" :label="item.label" :key="item.id" :prop="item.name">
            <el-input v-model="data[item.name]" v-if="item.type==='input'"></el-input>
            <el-select v-model="data[item.name]" placeholder="请选择活动区域"  v-if="item.type==='select'">
                <el-option v-for="o in item.options" :value="o.value" :label="o.label" :key="o.value">
                    {{o.label}}
                </el-option>
            </el-select>
            <el-col :span="11"  v-if="item.type === 'date-picker'">
                <el-date-picker type="date" placeholder="选择日期" v-model="data[item.name]" style="width: 100%;"></el-date-picker>
            </el-col>
                <el-col class="line" :span="2" v-if="item.type === 'date-picker'&& item.type === 'time-picker'">-</el-col>
            <el-col :span="11" v-if="item.type === 'time-picker'">
                <el-time-picker placeholder="选择时间" v-model="data[item.name]" style="width: 100%;"></el-time-picker>
            </el-col>
            <el-switch v-model="data[item.name]" v-if="item.type === 'switch'"></el-switch>
            <el-checkbox-group v-model="data[item.name]" v-if="item.type === 'checkbox'">
                <el-checkbox  v-for="o in item.options" :key="o.label" :label="o.label" :value="o.value"></el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-model="data[item.name]" v-if="item.type === 'radio'">
                <el-radio  v-for="o in item.options" :key="o.label" :label="o.label"></el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="data[item.name]" v-if="item.type === 'textarea'"></el-input>
            <el-cascader v-model="data[item.name]" :options="item.options" v-if="item.type === 'cascader'" :prop="item.name"></el-cascader>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="resetFelids">取消</el-button>
        </el-form-item> 
    </el-form>
</template>
<script>
    export default {
        name: "y-form",
        props: {
            data:{
                type: Object,
                default: {}
            },
            feilds: {
                type: Array,
                default: []
            },
            rules: {
                type: Object,
                defalut: []
            }
        },
        methods: {
            handleSubmit() {
               this.$emit("valid", this.$refs.form.validate(v => v))
            },
            resetFelids() {
                this.$refs.form.resetFields();
            }
        },
    }
    
</script>
