import Home from '@/views/home/Home.vue';
import Favorite from '@/views/favorite/Favorite.vue';
import Category from '@/views/category/Category.vue';
import MyAccount from '@/views/my-account/MyAccount.vue';
import Tabs from '@/views/Tabs.vue';
import ComShowProductByCategory from '@/views/category/component/ComShowProductByCategory.vue';
import ProductDetail from "@/views/product/ProductDetail.vue";
import ComPageTag from "@/views/home/component/ComPageTag.vue"

const routes = [
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'category',
        component: Category,
      },
      {
        path: 'favorite',
        component: Favorite,
      },
      {
        path: 'my-account',
        component: MyAccount,
      },
      {
        path: 'category-product/:name',
        component: ComShowProductByCategory,
      },
      {
        path: 'product-detail/:name', // ✅ FIXED (removed /)
        component: ProductDetail,
      },
      {
        // path: 'tag/:name',
        path: 'tag/:name',
        component: ComPageTag,
      },
    ],
  },
];

export default routes;
