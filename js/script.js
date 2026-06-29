const { createApp } = Vue;

createApp({
    data() {
        return {
            targetDate: new Date('2026-12-29T00:00:00+03:00').getTime(),
            months: '00',
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
            interval: null,
            floatingNodes: []
        }
    },
    mounted() {
        this.generateAbstractNodes();
        this.calculateTime();
        this.interval = setInterval(this.calculateTime, 1000);
    },
    methods: {
        calculateTime() {
            const now = new Date().getTime();
            const difference = this.targetDate - now;

            if (difference > 0) {
                const rawMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
                const rawDays = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
                const rawHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const rawMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const rawSeconds = Math.floor((difference % (1000 * 60)) / 1000);

                this.months = rawMonths.toString().padStart(2, '0');
                this.days = rawDays.toString().padStart(2, '0');
                this.hours = rawHours.toString().padStart(2, '0');
                this.minutes = rawMinutes.toString().padStart(2, '0');
                this.seconds = rawSeconds.toString().padStart(2, '0');
            } else {
                clearInterval(this.interval);
                this.months = '00';
                this.days = '00';
                this.hours = '00';
                this.minutes = '00';
                this.seconds = '00';
            }
        },
        generateAbstractNodes() {
            const colors = ['#00D2FF', '#3A7BD5', '#1e293b'];
            for (let i = 0; i < 8; i++) {
                this.floatingNodes.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: 200 + Math.random() * 400,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: 15 + Math.random() * 20,
                    delay: Math.random() * 5
                });
            }
        }
    },
    beforeUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}).mount('#app');