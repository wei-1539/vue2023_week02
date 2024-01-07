import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'wei_rio',
            products:[],
            templateProduct:{},


        }
    },

    methods: {
        // 驗證資料
        check() {
            const url = `${this.apiUrl}/api/user/check`
            axios.post(url) 
            .then((res)=>{
                console.log(res)
                alert("登入成功")
                this.getApiData()
            })
            .catch((err)=>{
                console.log(err)
                alert(err.data.message)
                // 未登入時返回登入頁面
                window.location='login.html'
            })
        },
        // 取得資料
        getApiData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`
            axios.get(url)
            .then((res)=>{
                console.log(res)
                //將資料傳給vue data 裡面，讓頁面使用
                this.products= res.data.products
            })
            .catch((err)=>{
                console.log(err);
                alert(err.data.message)
            })
        },

        openTemplateProduct(item){
            this.templateProduct= item
        }
    },
    mounted() {
        // 取出 Token   ＰＳ hexToken 需要填入跟建立cookie的名稱一致
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        //  當axios 發出api請求時 自動全部將header加入上去
        axios.defaults.headers.common.Authorization = token;
        this.check()
    },
}).mount('#app')