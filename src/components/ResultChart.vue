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
        votes: Array,
        worst: Array
    });

    let data = null
    if (props.worst.length > 0 && props.votes.length > 0) {
        data = {
            labels: props.labels,
            datasets: [
                {
                    label: 'Votes',
                    data: props.votes,
                    borderWidth: 1,
                    backgroundColor: '#2196F3',
                },
                {
                    label: 'Worst',
                    data: props.worst,
                    borderWidth: 1,
                    backgroundColor: '#F44336',
                }
            ]
        }
    } else if (props.worst.length == 0) {
        data = {
            labels: props.labels,
            datasets: [
                {
                    label: 'Votes',
                    data: props.votes,
                    borderWidth: 1,
                    backgroundColor: '#2196F3',
                }
            ]
        }
    } else {
        data = {
            labels: props.labels,
            datasets: [
                {
                    label: 'Worst',
                    data: props.worst,
                    borderWidth: 1,
                    backgroundColor: '#F44336',
                }
            ]
        }
    }

    const options = { scales: { y: { beginAtZero: true } } } 
    

</script>

