const { createApp } = Vue;

createApp({
    data() {
        return {
            floatingNodes: []
        }
    },
    mounted() {
        this.generateAbstractNodes();
    },
    methods: {
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
    }
}).mount('#app');