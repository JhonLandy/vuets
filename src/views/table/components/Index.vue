<template>
    <div>
        <div class="frame">
            <div class="toolbar">
                <slot name="toolbarT"></slot>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-size.sync="size"
                    :page-sizes="limitGroup"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSize"
                    @current-change="onCurrent"
                ></el-pagination>
            </div>
        </div>
        <el-table  v-bind="$attrs" v-on="$listeners" :data="data">
            <el-table-column
                v-if="checked"
                v-bind="checked.$attrs"
            >
                <template v-slot="scope">
                    <el-checkbox name="type" @change="checkSingle(scope)" :value="scope.row.checked"></el-checkbox>
                </template>
                <template v-slot:header>
                    <el-checkbox name="type" @change="checkAll" :value="isChecked"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    v-for="{id, template, attrs, header, methods} in column"
                    :key="id"
                    v-bind="attrs"
            >
                <template v-slot="scope" v-if="template">
                    <CreateDom  v-on="methods" :template="template" :scope="scope" />
                </template>
                <template v-slot:header="scope" v-if="header">
                    <CreateDom  v-on="methods"  :scope="scope" :template="header"/>
                </template>
            </el-table-column>
        </el-table>
        <div class="frame">
            <div class="toolbar">
                <slot name="toolbarB"></slot>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-size.sync="size"
                    :page-sizes="limitGroup"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSize"
                    @current-change="onCurrent"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import CreateDom from './CreateDom'
    import { Component, Prop, Vue, Watch } from "vue-property-decorator";
    
    
    @Component({
        components: {
            CreateDom
        }
    })
    export default class Table extends Vue {
        page = 1
        isChecked = false

        @Prop({
            default: () => []
        })
        column!: any[]

        @Prop({
            default: 0
        })
        limit!: number

        @Prop({
            default: () => [10, 20, 30, 50]
        })
        limitGroup!: any[]

        @Prop({
            default: 0
        })
        total!: number

        @Prop()
        pagination!: () => void 

        @Prop()
        checked!: any

        @Prop()
        data!: any

        get size() {
            return this.limit
        }
        
        onSize(val: any) {
             this.$emit('update:limit', val)
        }
        onCurrent(val: any) {
            this.currentPage = val
        }
        checkAll(value: any) {
            this.data.forEach((item: any) => {
                item.checked = this.isChecked = value
            })
        }
        checkSingle({row}: any) {
            row.checked = !row.checked
            if (!row.checked) {
                this.isChecked = false
            } else {
                this.isChecked = this.data.every((item: any) => item.checked)
            }
        }

        get currentPage() {
            return this.page
        }
        set currentPage(val) {
            this.$emit('update:page', val)
            this.pagination && this.pagination()
        }
    }
</script>

<style lang="scss" scoped>
    .frame {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;

    }
    .el-table {
        border: 1px solid rgb(223, 230, 236);
        border-radius: 4px;
    }
</style>
