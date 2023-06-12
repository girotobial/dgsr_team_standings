<script lang="ts">
    import { Driver } from "../data";
    import { flip } from "svelte/animate";

    export let drivers: Array<Driver>;
</script>

<table class="table table-sm table-dark table-responsive">
    <thead>
        <th scope="column">Position</th>
        <th scope="column">Driver</th>
        <th scope="columm">Points</th>
        <th scope="column">Fastest Lap</th>
    </thead>
    <tbody>
        {#each drivers as driver (driver.driverNumber)}
            <tr animate:flip>
                <th scope="row">{driver.position}</th>
                <td>{driver.carNumber} {driver.name}</td>
                <td>{driver.points}</td>
                <td>{driver.fastestLapString()}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .table {
        margin-bottom: 0px;
        text-align: justify;
    }
</style>
