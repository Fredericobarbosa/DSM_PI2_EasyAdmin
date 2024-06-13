const { createApp } = Vue;

createApp({
    data() {
        return {
            isModalOpen: false
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        }
    }
}).mount("#app");