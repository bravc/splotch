<script lang="ts">
	import { onMount } from 'svelte';

	import { access_token, spotify_token } from '../stores/user';
	import { device_id } from '../stores/player';
	import type { Track } from '../types';
	import { apiRequest, HttpVerb } from '../api/utils';
	import TrackList from './TrackList.svelte';

	const apiUrl = __myapp.env.API_URL;
	let time_range = 'short_term';

	let topTracks = async (): Promise<Track[]> => {
		let json: { items: Track[] } = await apiRequest(
			`${apiUrl}/api/top?time_range=${time_range}`,
			HttpVerb.GET,
			$access_token
		);

		return json.items;
	};
</script>

<TrackList fetchFunc={topTracks}>
	<span slot="controls">
		<div class="level-right">
			<!-- <button on:click={playSongs} class="button level-item is-dark is-rounded"><i class="fas fa-save" /></button> -->
			<div class="level-item control has-icons-left">
				<div class="select level-item select is-rounded">
					<select on:blur={() => topTracks()} bind:value={time_range}>
						<option selected={time_range == 'short_term'} value={'short_term'}>Short Term</option>
						<option selected={time_range == 'medium_term'} value={'medium_term'}>Medium Term</option>
						<option selected={time_range == 'long_term'} value={'long_term'}>Long Term</option>
					</select>
				</div>

				<div class="icon is-small is-left"><i class="fas fa-calendar-alt" /></div>
			</div>
		</div>
	</span>
</TrackList>
