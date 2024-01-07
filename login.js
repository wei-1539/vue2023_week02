import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data(){
        return{
            user :{
                username:"",
                password:"",
            }
        }
    },
    methods:{
        login(){
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
            axios.post(api,this.user)
            .then((res)=>{
                console.log(res);
                const {token,expired} = res.data
                // 取出ＡＰＩ回傳的token(類似金鑰)
                console.log(token);
                // 金耀到期的時間
                console.log(expired);
                // hexToken 可自己定義 【用於顯示在cookie的名稱】
                // new Date()是用來轉換 expired的格式 從純數字 轉換成 年/月/日
                document.cookie = `hexToken = ${token};expires = ${new Date(expired)}; path=/`
                // 將網址轉換到 products 【產品頁面】
                window.location="products.html"
            })
            .catch((err)=>{
                // console.log(err.response);
                alert(err.data.message)
            })
        }
    }


}).mount("#app")