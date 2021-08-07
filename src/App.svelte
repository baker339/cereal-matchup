<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import NavBar from "./Components/NavBar.svelte";
</script>

<NavBar />
<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>