new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        screen: 'home',
        isPlayerWinner: false,
        log: []
    },
    computed: {
        isEnded() {
            return this.playerLife === 0 || this.monsterLife === 0
        }
    },
    methods: {
        doNormalAttack() {
            let playerDamage = Math.round((Math.random() * 10) + 1)
            let monsterDamage = playerDamage + Math.round((Math.random() * 4) + 1)
            this.doDamage(playerDamage, monsterDamage)
            this.log.unshift({
                msg1: `Your damage was ${playerDamage}.`,
                msg2: `Monster damage was ${monsterDamage}.`
            }) 
            console.log(this.screen)
        },
        doSpecialAttack() {
            let monsterDamage = Math.floor((Math.random() * 10) + 1)
            let playerDamage = monsterDamage + Math.floor((Math.random() * 4) + 3)
            this.doDamage(playerDamage, monsterDamage)
            this.log.unshift({
                msg1: `Your damage was ${playerDamage}.`,
                msg2: `Monster damage was ${monsterDamage}.`
            })
        },
        doHeal() {
            let healAmount = Math.floor((Math.random() * 13) + 1)
            let monsterDamage = Math.floor((Math.random() * 10) + 1);
            this.playerLife = Math.min(this.playerLife + healAmount, 100)
            this.doDamage(0, monsterDamage)
            this.log.unshift({
                msg1: `Your heal was ${healAmount}`,
                msg2: `Monster damage was ${monsterDamage}`
            })  
        },
        startNewMatch() {
            this.playerLife = 100,
            this.monsterLife = 100,
            this.isPlayerWinner = false,
            this.log = [],
            this.screen = 'playing'
        },
        doDamage(playerDamage, monsterDamage) {
            this.playerLife = Math.max(this.playerLife - monsterDamage, 0)
            this.monsterLife = Math.max(this.monsterLife - playerDamage, 0)
        }
    },
    watch: {
        isEnded(value) {
            if (value) {
                this.isPlayerWinner = this.monsterLife === 0
                this.screen = 'final'
            }
        }
    }
})