import {ref,onMounted} from "vue"
const business_info= ref({})
const favorites = ref([]) // array string of product
const isInitialize = ref(false)
const isInitializeFavorite = ref(false)

const tag = ref([])

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

	async function getTag(){
		const rest = await app.getApi("frappe_emenu.api.get_tag_state")
		if(rest.data){
			tag.value = rest.data.stats._user_tags.map(x => ({
				name: x[0],
				total: x[1],
				color: getRandomColor()
			}))
		}
	}

	function getRandomColor(){
		const color = "#" + Array.from(crypto.getRandomValues(new Uint8Array(3)))
		.map(v => v.toString(16).padStart(2, "0"))
		.join("");

		return color;
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

		// get random color
		getRandomColor()
		//getTag
		getTag()


    })
    return {
        business_info,
        favorites,
        addToFavorite,
        isFavorite,
		isInitializeFavorite,
		tag
    }
}
