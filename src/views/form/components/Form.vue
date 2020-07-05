<template>
    <form class="y-form">
        <slot></slot>
    </form>
</template>

<script>
    
    
    export default {
        name: "y-form",
        props: {
            data:{
                type: Object,
                default: {}
            }
        },
    }
    
</script>

<style lang="scss" scoped>
.y-form {
    padding: 10px;
    .y-input {
        width: 100%;
        height: 125%;
    }
}
</style>