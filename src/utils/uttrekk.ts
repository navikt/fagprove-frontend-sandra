import type { BehandletSoknad } from '../api/types';

function trekkUtFraGruppe(
	liste: BehandletSoknad[],
	prosent: number,
): BehandletSoknad[] {
	const antallSakerIUtvalg = Math.round((liste.length * prosent) / 100);
	const tilfeldigRekkefolge = [...liste].sort(() => Math.random() - 0.5);
	return tilfeldigRekkefolge.slice(0, antallSakerIUtvalg);
}

export function genererUttrekk(
	soknader: BehandletSoknad[],
	prosent: number,
): BehandletSoknad[] {
	const grupper = Object.groupBy(soknader, (soknad) => soknad.vedtak.type);
	return Object.values(grupper).flatMap((liste) =>
		trekkUtFraGruppe(liste!, prosent),
	);
}
