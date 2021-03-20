<template>
    <div id="app">
        <v-date-picker
               is-inline
               is-expanded
               locale="th"
               color="red"
               :show-day-popover="false"
               v-model="selectedDate"
        />
        <!-- :available-dates=dates -->
        <button
            class="select"
            :disabled="!selectedDate"
            :style="{ background: theme }"
            @click="select"
        >
            เลือกวันที่
        </button>
    </div>
</template>

<script>
import createMomentsSDK from '@livechat/moments-sdk'
import moment from 'moment'

export default {
    data () {
        return {
            theme: '#da3906',
            momentsSDK: null,
            selectedDate: null,
            datesFromDB: ['18/03/2021', '20/03/2021', '22/03/2021']
        }
    },
    computed: {
        dates () {
            return this.datesFromDB.map(d => moment(d, 'DD/MM/YYYY').toDate())
        }
    },
    methods: {
        select () {
            if (!this.selectedDate || !this.momentsSDK) {
                return
            }

            this.momentsSDK.sendMessage({ text: this.selectedDate.toLocaleDateString() })
            this.momentsSDK.close()
        }
    },
    async created () {
        createMomentsSDK({
            title: 'Date picker',
            icon: `${window.location.origin}${window.location.pathname}/favicon.png`
        }).then(momentsSDK => {
            this.momentsSDK = momentsSDK
        })
    }
}
</script>

<style lang="sass">
    *
        margin: 0
        padding: 0
        box-sizing: border-box
        outline: none

    html, body, #app
        height: 100%
        width: 100%

    #app
        padding: 10px

    button.select
        width: 100%
        margin-top: 15px
        padding: 10px
        color: #ffffff
        border: none
        border-radius: 4px
        font-size: 16px
        -webkit-backface-visibility: hidden
        transition: all .3s
        cursor: pointer
        &:hover
            opacity: 0.8
        &:active
            opacity: 0.5
        &:disabled
            opacity: 0.2
</style>
