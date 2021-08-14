<script>
	import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { onMount } from 'svelte';

	// declare cereal variables
	let cerealOneName;
	let cerealOneImage;
	let cerealOneId;
	let cerealOneVotes;

	let cerealTwoName;
	let cerealTwoImage;
	let cerealTwoId;
	let cerealTwoVotes;

    onMount(() => {
		getCereals();
	});
	
	function getCereals() {
		// get cereals from firestore
		const cerealsRef = db.collection('cereals');
		const cereals = collectionData(cerealsRef);

		// get length of cereals collection
		let cerealsLength;
		let cerealOneIndex;
		let cerealTwoIndex;
		db.collection('cereals').get().then(snap => {
			// get length of collection
			cerealsLength = snap.size;
			console.log(`There are ${cerealsLength} cereals available.`);

			//assign indexes for cereals
			cerealOneIndex = Math.floor(Math.random() * cerealsLength);
			cerealTwoIndex = cerealOneIndex;
			while(cerealOneIndex == cerealTwoIndex) {
				cerealTwoIndex = Math.floor(Math.random() * cerealsLength);
			}
			// get data for each cereal
			cereals.forEach(cereal => {
				console.log(cereal);
				//cereal one
				cerealOneName = cereal[cerealOneIndex].name;
				cerealOneImage = cereal[cerealOneIndex].image;
				cerealOneId = cereal[cerealOneIndex].id;

				// cereal two
				cerealTwoName = cereal[cerealTwoIndex].name;
				cerealTwoImage = cereal[cerealTwoIndex].image;
				cerealTwoId = cereal[cerealTwoIndex].id;

				db.collection('matchups').where("cerealId", "==", cerealOneId).get().then(snap => {
					cerealOneVotes = snap.size;
				});

				db.collection('matchups').where("cerealId", "==", cerealTwoId).get().then(snap => {
					cerealTwoVotes = snap.size;
				});

			})
		});
		
	}

	let cerealOneCount = 0;
	let cerealTwoCount = 0;

	function incrementCerealOne() {
		db.collection('matchups').add({ 
			cerealId: cerealOneId, 
			cerealName: cerealOneName, 
			cerealIndex: 0, 
			opponentId: cerealTwoId, 
			opponentName: cerealTwoName, 
			created: Date.now() });
		cerealOneCount += 1;
		getCereals();
	}

	function incrementCerealTwo() {
		db.collection('matchups').add({ 
			cerealId: cerealTwoId, 
			cerealName: cerealTwoName, 
			cerealIndex: 1, 
			opponentId: cerealOneId, 
			opponentName: cerealOneName, 
			created: Date.now() });
		cerealTwoCount += 1;
		cerealOneName = null;
		cerealTwoName = null;
		getCereals();
	}

	function skipMatchup() {
		cerealOneName = null;
		cerealTwoName = null;
		getCereals();
	}
</script>

<main>
    <img src="assets/SCSLogo.png" alt="logo" style={{width: "125%"}}/>
	<h4>Choose your favorite below!</h4>
	
</main>

<body>
	<div class="matchup">
		{#if cerealOneName && cerealTwoName}
		<div class="matchup-item" on:click={incrementCerealOne}>
			<img src={cerealOneImage} alt={cerealOneName + " box"}/>
			<h4>{cerealOneName}</h4>
		</div>
		{:else}
		<div class="matchup-item">
			<img src="assets/CerealPour.gif" alt="gif" />
		</div>
		{/if}
		<div class="versus">
            <img src="https://www.pinclipart.com/picdir/big/535-5355617_versus-battle-transparent-png-mortal-kombat-vs-logo.png" alt="versus image"/>
		</div>
		{#if cerealOneName && cerealTwoName}
		<div class="matchup-item" on:click={incrementCerealTwo}>
			<img src={cerealTwoImage} alt={cerealTwoName + " box"}/>
			<h4>{cerealTwoName}</h4>
		</div>
		{:else}
		<div class="matchup-item">
			<img src="assets/CerealPour.gif" alt="gif" />
		</div>
		{/if}
	</div>
	<div class="skip-button">
		<button on:click={skipMatchup}>Skip</button>
	</div>
</body>

<style>

	@media only screen and ( min-width: 1080px) {

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
	
		.versus img {
			max-width: 200px;
		}
	
		h4 {
			color: #333;
			text-transform: uppercase;
			font-weight: 100;
		}
	
		img{
			max-height: 400px;
			width: 400px;
		}
	
		.matchup-item img:hover{ 
			animation: shake 500ms infinite;
			animation-timing-function: linear;   
		}
	
		@keyframes shake {
			0% { transform: rotate(0.5deg) scale(1.05); }
			50% { transform: rotate(-0.5deg) scale(1.05); }
			100% { transform: rotate(0.5deg) scale(1.05); }
		}

		.skip-button button {
			background-color: #ff3e00;
			color:white;
			border-radius: 10px;
			width: 10%;
			height: 3%;
		}

		.skip-button button:hover {
			background-color: #ce3705;
		}
	}

	@media only screen and ( max-width: 1079px) {
	
		.versus {
			flex: 0;
			justify-content: space-around;
			align-self: center;
			font-size: large;
			font-weight: bold;
		}
	
		.versus img {
			max-width: 10%;
		}
	
		h4 {
			color: #333;
			text-transform: uppercase;
			font-weight: 100;
		}
	
		img{
			max-width: 75%;
			height: auto;
		}

		.matchup-item img{ 
			max-width: 40%; 
		}
	
		.matchup-item img:hover{ 
			animation: shake 500ms infinite;
			animation-timing-function: linear;   
		}
	
		@keyframes shake {
			0% { transform: rotate(0.5deg) scale(1.05); }
			50% { transform: rotate(-0.5deg) scale(1.05); }
			100% { transform: rotate(0.5deg) scale(1.05); }
		}

		.skip-button button {
			background-color: #ff3e00;
			color:white;
			border-radius: 10px;
			width: 10%;
			height: 3%;
		}

		.skip-button button:hover {
			background-color: #ce3705;
		}
	}

</style>