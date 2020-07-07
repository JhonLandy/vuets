<template>
    <net-table
        :data="list"
        :total="total"
        :column.sync="column"
        :page.sync="page"
        :limit.sync="limit"
        border
        :checked="checked"
        @row-dblclick="dbClick"
        @test="doRecover"
    >
        <template v-slot:toolbarT>
            <el-button size="small" @click="doRefresh">刷新</el-button>
        </template>
        <template v-slot:toolbarB>
            <el-button size="small" @click="doDel">删除</el-button>
        </template>
    </net-table>
</template>
<script lang="ts">
    import {Vue, Watch, Component } from "vue-property-decorator"
    import NetTable from './components/Index'

    @Component({
        components: {
            NetTable
        }
    })
    export default class Table extends Vue {
        name = 'tabless'
        page = 1
        limit = 10
        list: Array<any> = []
        tableData: Array<any> = []
        
        @Watch('page')
        pages (val: number) {
            this.getData(val, this.limit)
        }

        @Watch('limit')
        limits(val: number) {
            this.getData(this.page, val)
        }

        get total() {
            return this.tableData.length
        }

        doDel() {
            this.$message({
                message: '删除成功！',
                type: 'error'
            })
        }

        doRecover({row}: any) {
            row.status = '1'//地址引用问题，可触发子组件table更新,一般情况可用，特殊情况不推荐
            this.$message({
                message: '通过审批！',
                type: 'success'
            })
        }
        
        dbClick() {
            this.$message({
                message: '你双击了！',
                type: 'success'
            })
        }
        doRefresh(data: any[]) {
            console.log(data)
        }
        private data() {
            return {
                isAdmin: true,
                checked: {
                    attrs: {
                        width: ' 50',
                        align: 'center',
                        prop: 'checked',
                    }
                },
                column: [
                    {
                        id: 1,
                        attrs: {
                            label: '序号',
                            prop: 'order',
                        },
                        template: `
                            <el-tag type="warning" size="small">{{scope.row.order}}</el-tag>
                        `
                    },
                    {
                        id: 2,
                        attrs: {
                            label: '申请人',
                            prop: 'name'
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    {{scope.row.name}}
                                    <el-tag type="success" size="small">当前登录的账号有管理员权限</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 3,
                        attrs: {
                            label: 'ip地址',
                            prop: 'ip'
                        },
                        template: function (scope: any) {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    ${scope.row.ip}
                                    <el-tag type="info" size="small">异常状态</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 4,
                        attrs: {
                            label: '流程状态',
                            prop: 'status'
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    <el-tag type="success" v-if="scope.row.status === '1'" size="small">通过</el-tag>
                                    <el-tag type="danger" v-else size="small">不通过</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 5,
                        attrs: {
                            label: '操作',
                            prop: 'operation',
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            //events自定义事件@test注入table组件
                            return `
                                <div>
                                    <el-button type="success" size="medium" @click="doRecover(scope)">通过</el-button>
                                    <el-button type="danger" size="medium" @click="doDel">删除</el-button>
                                </div>
                            `
                        },
                        methods: {
                            doRecover: this.doRecover,
                            doDel: this.doDel
                        }
                    }
                ],
                data: []
            }
        }
        private created() {
            for (let i = 0;i < 100;i++) {
                 this.tableData.push({
                    checked: "",
                    order: i,
                    name: "小明"+i,
                    ip: '192.168.'+(i +1),
                    status: '0'
                })
            }
            this.getData(this.page, this.limit)
        }

        getData(page: number, size: number) {
            const start = (page-1)*size
            const end = page*size - 1
            const temp = []
            for (let i = start;i <= end;i++) {
                temp.push(this.tableData[i])
            }
            this.list = temp
        }
    }
</script>
