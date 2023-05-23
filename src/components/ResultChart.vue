<template>

    <Bar :data="data" :options="options"></Bar>

</template>

<script setup>

    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
    import { Bar } from 'vue-chartjs'
    import { defineProps } from 'vue';

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

    const props = defineProps({
        labels: Array,
        votes: Array
    });

    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Abstimmungen',
                data: props.votes,
                borderWidth: 1,
                backgroundColor: '#2196F3',
            }
        ]
    }

    const options = { scales: { y: { beginAtZero: true } } } 
    

</script>

