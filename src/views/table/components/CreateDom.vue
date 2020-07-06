<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator'

    interface Mmethods {
        [propName: string]: (...params: any) => void;
    }

    type _template = (template: object) => string | string

    function mapMethods(methods: any) {
       
       const _methods: Mmethods = {}

        const keys = Object.keys(methods)

        for (let i = 0;i< keys.length;i++) {
            const key = keys[i]
            _methods[key] = function (...params) {
                this.$emit(key, ...params)
            }
        }
        return _methods
    }

    @Component
    export default class CreateDom extends Vue {
        name = 'CreateDom'
        @Prop()
        scope!: any
        
        @Prop()
        template!: _template

        get scopes() {
            return this.scope
        }

        private beforeCreate() {
            this.$options.methods = {...mapMethods(this.$listeners)}
        }
        render() {
            let template = ""

            if (typeof this.template === 'function') {
                template = this.template(this.scopes)
            } else {
                template = this.template
            }
            
            if (!template) {
                console.error("CreateDom组件找不到模版内容template，请检查！")
                return
            }
            return Vue.compile(template).render.call(this, {})
        }

    }
</script>
