<template>
    <div class="soucre">
        <input class="y-select" type="text" v-model="selectValue" @focus="dropDwon" @blur="dropUp" readonly/>
        <transition name="fade">
            <div class="y-dropdown-wrap" v-show="isShow">
                <ul class="y-items-list">
                    <slot></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'y-select',
        props: ["value"],
        data() {
            return {
                selectValue: "",
                isShow: false
            }
        },
        created () {
            this.$bus.$on("change", v => {
                this.selectValue = v.name;
                this.$emit("input", v.id)
            })
        },
        methods: {
            dropUp(e) {
               this.isShow = false
            },
            dropDwon(e) {
               this.isShow = true
            }
        }
    }
</script>
<style lang="scss" scoped>
html,body,div,ul,li { 
    margin:0; padding:0; 
}
.soucre{
    display: inline-block;
    width:100%;
    .y-select {
        width: 100%;
        height: 35px;
    }
    .y-dropdown-wrap {
        width: 100%;
        height: auto;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: 0 0 1px 1px rgba(241, 241, 241, .8);
        .y-items-list {
            display: inline-block;
            width: 100%;
        }
    }
}
</style>
