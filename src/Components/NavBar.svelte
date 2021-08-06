<script>
	
</script>

<header>
    <div class="navbar">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#/results">Results</a></li>
        </ul>
    </div>
</header>

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

	table {
		margin: auto;
		width: 50% !important;
		padding-top: 3%; 
	}

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

    .navbar ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        text-align: center;
    }

    .navbar li {
        display: inline-block;
        padding-left: 5%;
        padding-right: 5%;
    }

    .navbar li a {
        display: inline-block;
        color: #333;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 1.5em;
    }

    .navbar li a:hover {
        background-color: #ff3e00;
        color:white;
        border-radius: 10px;
    }

</style>