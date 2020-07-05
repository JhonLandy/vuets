<script lang="ts">
    import {Vue, Inject, Prop, Component} from 'vue-property-decorator'

    interface Mmethods {
        [propName: string]: ((...params: any) => void);
    }
    

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
    @Component({
        props: {
            _data: {
                default: () => ({})
            },
            template: {
                type: [Function, String],
                default: ''
            }
        }
    })
    type _template = (template: string) => string | string

    export default class CreateDom extends Vue {
       
        name = 'CreateDom'
        template!: _template
        _data = {}
        private data() {
            return {
                ...this._data
            }
        }
        get scope() {
            return this._data
        }

        private beforeCreate() {
            this.$options.methods = {...mapMethods(this.$listeners)}
        }
        render() {
            let template = ""
            if (typeof this.template === 'function') {
                template = this.template(this.scope)
            }
            if (!template) {
                console.error("CreateDom组件找不到模版内容template，请检查！")
                return
            }
            return Vue.compile(template).render.call(this, {})
        }

    }
</script>
