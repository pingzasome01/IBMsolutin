import Vue from "vue"
import VueRouter from 'vue-router'
// import LoginPage from '../views/LoginPage'
import Case1 from '../views/Case1'
import parents1 from '../parents/parents1'
import parents2 from '../parents/parents2'
import Case3 from '../views/Case3'
import Case4 from '../views/Case4'

// import Case3 from '../views/children/Case3'



Vue.use(VueRouter)

const routes = [
 
// {
//     path:'/loginpage',
//     name:'LoginPage',
//     component: LoginPage
// },
// {
//     path:'/case1',
//     name:'Case1',
//     component: Case1
// },
// {
//     path:'/parents1',
//     name:'Parents1',
//     component: parents1
// },
 
{
    path:'/parents1',
    name:'Parents1',
    component: parents1,
    children:[
        {
            path:'/case1',
            name:'Case1',
            component: Case1
        },
        {
            path:'/case3',
            name:'Case3',
            component: Case3
        },
        {
            path:'/case4',
            name:'Case4',
            component: Case4
        },
        
    ]
},
{
    path: '/parents2',
    name: 'Parents2',
    component: parents2
}


]



const router = new VueRouter({
    routes
})

export default router