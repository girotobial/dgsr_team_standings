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

    function toggleDrivers(team: Team) {
        console.log(team.name);
        team.showDrivers = !team.showDrivers;
        team = team;
        teams = teams;
    }
</script>

<main>
    <h1><strong style="color: red">DGSR</strong> Season 9 Team Positions</h1>

    <table class="table table-dark table-responsive table-striped table-hover">
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
    table {
        margin: 10px;
    }
</style>
