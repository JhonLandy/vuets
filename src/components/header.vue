<template>
    <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="1">
            <router-link :to="{name: 'page'}">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link :to="{name: 'table'}">表格</router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link :to="{name: 'form'}">表单</router-link>
        </el-menu-item>
        <el-menu-item index="3" style="float: right" @click="logout">
            <router-link :to="{name:'login'}">{{this.userInfo.username ? `欢迎你！${this.userInfo.username}` : "登陆"}}</router-link>
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                userInfo:{},
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        watch: {
            $route: {
                handler() {
                    this.userInfo = {...this.$store.state.userInfo};
                },
                immediate: true
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {
                this.userInfo = {};
                window.localStorage.removeItem("isLogin");
            }
        }
    }
</script>