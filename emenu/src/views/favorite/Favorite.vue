<template>
<ion-page>
    <ion-content>
        <div v-for="p in data">
            {{ p }}
        </div>
    </ion-content>
</ion-page>
</template>
    <script setup>
    import {ref,onMounted} from "vue"
    import { IonContent,IonPage } from '@ionic/vue';
    import { useApp } from '@/hooks/useApp';
    const {favorites} = useApp();
    const data = ref([])
    
    
    onMounted(async()=>{
        const res = await app.getDocList("Products",{
            filters:[
                ["name","in",favorites.value]
            ]
        })
        if(res.data){
            data.value = res.data
        }
    })

</script>