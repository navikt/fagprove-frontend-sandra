import type { BehandletSoknad } from './types';

export async function hentSoknader(): Promise<BehandletSoknad[]> {
	const response = await fetch('/api/soknader');
	if (!response.ok) {
		throw new Error(`Feil ved henting av søknader: ${response.status}`);
	}
	return response.json();
}
