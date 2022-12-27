import Vue from 'vue'
import VueRouter from 'vue-router'
import {getSession, USER_INFO} from "@/util/MemoryCommon";

Vue.use(VueRouter)



let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('@/views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Trang chủ',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('@/views/Layout.vue'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
		component: () => import('@/views/Tables.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('@/views/Billing.vue'),
	},
	{
		path: '/Profile',
		name: 'Trang cá nhân',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('@/views/Profile.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('@/views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('@/views/Sign-Up.vue'),
	},
	{
		path: '/first-login',
		name: 'First-Login',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('@/views/First-Login'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;

	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

router.beforeEach((to, from, next) => {
	// chuyển đến trang login nếu chưa được login
	const publicPages = ['/sign-in', '/sign-up'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = getSession(USER_INFO);

	if (authRequired && !loggedIn) {
		return next('/sign-in');
	}

	next();
})

export default router
