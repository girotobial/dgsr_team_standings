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
    import { Team } from "./data";
    import { onMount, onDestroy } from "svelte";
    import { flip } from "svelte/animate";
    import { getPositions } from "./data";
    import DriverTable from "./lib/DriverTable.svelte";

    let teams: Array<Team> = [];

    async function updateStandings() {
        teams = await getPositions();
    }

    const interval = setInterval(async () => {
        updateStandings();
    }, 10000);

    onMount(async () => {
        updateStandings();
    });

    onDestroy(() => clearInterval(interval));
</script>

<main>
    <h1><strong style="color: red">DGSR</strong> Season 9 Team Positions</h1>
    <div class="center table-responsive">
        <table class="table table-dark table-striped table-hover table-sm">
            <thead>
                <th scope="col">Position</th>
                <th scope="col">Points</th>
                <th scope="col">Team</th>
                <th scope="col">Car</th>
                <th scope="col">Drivers</th>
            </thead>
            <tbody class="table-group-divider">
                {#each teams as team, i (team.name)}
                    <tr animate:flip>
                        <th scope="row">{i + 1}</th>
                        <td>{team.points}</td>
                        <td>{team.name}</td>
                        <td>{team.carModel}</td>
                        <td><DriverTable drivers={team.drivers} /></td>
                    </tr>
                {/each}
            </tbody><tbody />
        </table>
    </div>
</main>

<style>
    main {
        width: 100%;
        text-align: center;
        background-color: #000000;
    }
    h1 {
        color: white;
    }
    .table {
        max-width: 80%;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid green;
    }
</style>
