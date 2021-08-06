<script>
	import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { onMount } from 'svelte';

	let matchupData;
	let groupedMatchups;
	let groupedMatchupResults;

    onMount(() => {
		getCereals();
	});

	function groupBy(objectArray, property) {
		return objectArray.reduce((acc, obj) => {
			const key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			// Add object to list for given key's value
			acc[key].push(obj);
			return acc;
		}, {});
		}
	
	function getCereals() {
        const matchupsRef = db.collection('matchups');
		const matchups = collectionData(matchupsRef);


		matchups.forEach(matchup => {
			matchupData = matchup;
			groupedMatchups = groupBy(matchupData, 'cerealName');
			console.log(groupedMatchups)
			groupedMatchupResults = Object.entries(groupedMatchups);
            groupedMatchupResults.sort((a,b) => Object.keys(b[Object.keys(b)[1]]).length - Object.keys(a[Object.keys(a)[1]]).length)
            console.log(groupedMatchupResults);
		});
		
	}
</script>

<h3>Results</h3>
<div>
	{#if groupedMatchupResults}
	<div class="results-table">
		<table>
			<tr>
				<th>Cereal</th>
				<th class="results-votes">Votes</th>
			</tr>
			{#each groupedMatchupResults as matchup, i}
			<tr>
				<td>{i+1}. {matchup[0]}</td>
				<td class="results-votes">{matchup[1].length}</td>
			</tr>
			{/each}
		</table>
	</div>
	{/if}
</div>

<style>
	main, body {
		text-align: center;
		padding: 1em;
		/* max-width: 240px; */
		margin: 0 auto;
	}

	.matchup {
		display: flex;
		padding: 10px;
		justify-content: space-around;
	}

	.matchup-item {
		flex: 0;
	}

	.versus {
		flex: 0;
		justify-content: space-around;
		align-self: center;
		font-size: large;
		font-weight: bold;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	img{
		max-height: 400px;
		width: 400px;
		animation-name: float-image;
		animation-duration: 6s;
		animation-iteration-count: infinite;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

    .results-table {
        display: flex;
        justify-content: center;
    }

	table {
    border-collapse: collapse;
    width: 80%;
    }

    th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    }

    tr:hover {background-color:#f5f5f5;}

	@keyframes float-image {
		0% {
			transform: skew(3deg, 3deg) scale(75%);
		}
		50% {
			transform: skew(-0.06turn, 18deg) scale(75%);
		}
		100% {
			transform: skew(3deg, 3deg) scale(75%);
		}
	}

    .results-votes {
        text-align: center;
    }
</style>