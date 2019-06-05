<template>
    <div>
        <k-input v-model="myInput"></k-input>
        {{myInput}}
    </div>
</template>
<script>
import KInput from './KInput.vue'
export default {
    name:'FormTest',
    components:{
        KInput
    },
    data() {
        return {
            myInput: 'v-model :value @input'
        }
    },

    
}
</script>
<style scoped>

</style>
