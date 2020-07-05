<template>
    <el-container>
        <el-header height="auto">
            <el-carousel
                indicator-position="inside"
                height="400px"
            >
                <el-carousel-item v-for="item in images" :key="item">
                    <img :src="item">
                </el-carousel-item>
            </el-carousel>
        </el-header>
        <el-main>
            <div ref="waterfall" class="waterfull">
                <el-row :gutter="20">
                    <Tab v-for="item in works" :work="item" :key="item.name"/>
                </el-row>
                <div class="waterfall-loading" ref='loading' v-show="isLoading">
                    拼命加载中
                    <i class="el-icon-loading"></i>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import Tab from '../../components/tab'
    import Http from "../../service/Http";
    import {throttle} from 'throttle-debounce'

    const arrUrl = [
        require('../../image/1.jpg'),
        require('../../image/2.jpg'),
        require('../../image/3.jpg'),
        require('../../image/4.jpg')
    ]

    @Component({
        components: {
            Tab
        }
    })
    export default class Page extends Vue {
        public name = 'page'
        private images = [...arrUrl]
        private works = []
        private isLoading = false
        private page = 1

        @Watch('$route', {immediate: true})
        handler() {
            Http.post(`/ycl/lecturer/lists?page=${this.page}&rows=8`).then(({data}) => {
                this.works = data;
            })
        }
        
    }
</script>
<style>

.el-header {
    padding: 0 0!important;
}
    .waterfall-loading{
        padding:10px 0;
        text-align: center;
        color: #1E9FFF;
    }

</style>