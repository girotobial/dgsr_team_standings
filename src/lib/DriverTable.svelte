<!--
   Copyright 2023 Alex Robinson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
<script lang="ts">
    import { Driver } from "../data";
    import { flip } from "svelte/animate";

    export let drivers: Array<Driver>;
</script>

<table class="table table-sm table-dark table-responsive">
    <thead>
        <th scope="column">Position</th>
        <th scope="column">Driver</th>
        <th scope="columm">Race Points</th>
        <th scope="column">Fastest Lap</th>
        <th scope="columm">Season Points</th>
    </thead>
    <tbody>
        {#each drivers as driver (driver.driverNumber)}
            <tr animate:flip>
                {#if driver.position !== 999}
                    <th scope="row">{driver.position}</th>
                    <td>{driver.carNumber} {driver.name}</td>
                    <td>{driver.points}</td>
                    <td>{driver.fastestLapString()}</td>
                    <td>{driver.seasonPoints}</td>
                {/if}
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
