import {ref,onMounted} from "vue"
const business_info= ref({})
const favorites = ref([]) // array string of product
const isInitialize = ref(false)
const isInitializeFavorite = ref(false)

export function useApp(){
    function addToFavorite(product_code){
        if(isFavorite(product_code)){
            favorites.value = favorites.value.filter(x=>x!=product_code)
        }else {
            favorites.value.push(product_code)
        }
        localStorage.setItem("favorites",JSON.stringify(favorites.value))
		isInitializeFavorite.value = false
    }

    function isFavorite(product_code){
        return favorites.value.find(x=>x==product_code) || false
    }

    async function getBusinessInfo(){
        const res =await app.getDoc("Business Information","tumnukjet")
        if(res.data){
            business_info.value = res.data
        }
    }
    onMounted(async()=>{
        if (isInitialize.value) return;
        isInitialize.value = true
 		const _favorites = localStorage.getItem("favorites") || "[]"
        if (_favorites){
            favorites.value = JSON.parse(_favorites)
        }
        // load busienss info
        await getBusinessInfo()
        // load favorite product
    })
    return {
        business_info,
        favorites,
        addToFavorite,
        isFavorite,
		isInitializeFavorite
    }
}
