import type { BehandletSoknad } from './types';

export async function hentSoknader(): Promise<BehandletSoknad[]> {
	const response = await fetch('/api/soknader');
	return response.json();
}
