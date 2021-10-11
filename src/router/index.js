import Vue from "vue"
import VueRouter from 'vue-router'
// import LoginPage from '../views/LoginPage'

import parents1 from '../parents/parents1'
import parents2 from '../parents/parents2'

import Comingsoon from '../components/Comingsoon'
import Case2 from '../views/Case2'
import Case0 from '../views/Case0'
import csv from '../views/csv'
import TopsideBar from '../components/TopsideBar'
import Home from '../views/Home'
import Footer from '../components/Footer'
import Importuni from '../views/Importuni'


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
        path: '/parents1',
        name: 'Parents1',
        component: parents1,
        children: [

            
            
        ]
        
        
        
    },
    {
        path: '/parents2',
        name: 'Parents2',
        component: parents2
    },
    {
        path: '/Comingsoon',
        name: 'Comingsoon',
        component: Comingsoon
    },
    {
        path: '/case0',
        name: 'Case0',
        component: Case0
    },
    
    {
        path: '/csv',
        name: 'csv',
        component: csv
    },
    
    {
        path: '/TopsideBar',
        name: 'TopsideBar',
        component: TopsideBar
    },
    
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    
    {
        path: '/case2',
        name: 'Case2',
        component: Case2
    },
    {
        path: '/Footer',
        name: 'Footer',
        component: Footer 
    },
    {
        path: '/Importuni',
        name: 'Importuni',
        component:Importuni 
    }
    
    
    
    

]



const router = new VueRouter({
    routes
})
// 

router.replace('/Comingsoon')

export default router