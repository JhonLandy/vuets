<template>
    <li :data-id="id" class="y-item" type="text" @click="optionClick">
        {{value}}
    </li>
</template>
<script>
    export default {
        name: 'y-option',
        props:['value', "id"],
        methods: {
            optionClick(e) {
                this.$bus.$emit("change", {
                    id: e.target.dataset.id,
                    name: e.target.innerHTML.trim()
                })
            }
        }
    }
</script>>
<style lang="scss" scoped>
.y-item {
    display: inline-block;
    width: 100%;
    padding: 10px;
    &:hover {
        color: #1989fa;
        background-color: rgb(248, 247, 247);
        cursor: pointer;
    }
}
</style>