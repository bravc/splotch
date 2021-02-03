<script lang="ts">
	import { onMount } from 'svelte';

	import { access_token } from '../stores/user';
	import { playing, player } from '../stores/player';
	import type { Snippet as SnippetType } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';
	import Snippet from './Snippet.svelte';
	import SnippetModal from './SnippetModal.svelte';

	const apiUrl = __myapp.env.API_URL;

	let loading = false;
	let showing = false;
	let snippets: SnippetType[] = [];

	onMount(async () => {
		loading = true;
		snippets = await getSnippets();
		loading = false;
	});

	let getSnippets = async (): Promise<SnippetType[]> => {
		let json: SnippetType[] = await apiRequest(`${apiUrl}/api/snippet/all`, HttpVerb.GET, $access_token);
		return json;
	};
</script>

<div class="tile is-parent is-vertical">
	<div class="level">
		<h1 class="level-left is-size-3">Your Snippets</h1>
	</div>
	{#if loading}
		<progress class="progress is-small is-primary" max="100">15%</progress>
	{:else}
		<div class="g">
			{#each snippets as snippet}
				<Snippet {snippet} />
			{/each}
		</div>
	{/if}
</div>
