const { createApp } = Vue;

const headers = ["PolyNode", "Confess", "Secrets"];
const pills = ["ANONYMOUS", "ENCRYPTED", "HIDDEN"];

createApp({
    data() {
        return {
            confessions: [],
            floatingItems: [],
            itemIdCounter: 0
        }
    },
    async mounted() {
        try {
            const response = await fetch('/confessions.json');
            this.confessions = await response.json();
            
            for(let i=0; i<1; i++) {
                setTimeout(() => this.spawn(), i * 2500);
            }
            setInterval(() => this.spawn(), 8000);
        } catch (error) {
            console.error("Failed to load confessions:", error);
        }
    },
    methods: {
        spawn() {
            if (this.confessions.length === 0) return;

            const id = this.itemIdCounter++;
            const types = ['light', 'dark'];
            const type = types[Math.floor(Math.random() * types.length)];

            this.floatingItems.push({
                id,
                type,
                header: headers[Math.floor(Math.random() * headers.length)],
                pill: pills[Math.floor(Math.random() * pills.length)],
                message: this.confessions[Math.floor(Math.random() * this.confessions.length)],
                left: 3 + Math.random() * 80,
                rot: (Math.random() * 20) - 10,
                scale: 0.4 + Math.random() * 0.3,
                duration: 20 + Math.random() * 10
            });

            setTimeout(() => {
                this.floatingItems = this.floatingItems.filter(i => i.id !== id);
            }, 35000);
        }
    }
}).mount('#app');