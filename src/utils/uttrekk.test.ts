import { describe, expect, test } from 'vitest';
import { genererUttrekk } from './uttrekk';
import type { BehandletSoknad } from '../api/types';

function lagSoknad(id: string, vedtakstype: string): BehandletSoknad {
	return {
		soknad: { id } as BehandletSoknad['soknad'],
		vedtak: { type: vedtakstype } as BehandletSoknad['vedtak'],
	};
}

const soknader: BehandletSoknad[] = [
	lagSoknad('1', 'Innvilget'),
	lagSoknad('2', 'Innvilget'),
	lagSoknad('3', 'Innvilget'),
	lagSoknad('4', 'Innvilget'),
	lagSoknad('5', 'Avslag'),
	lagSoknad('6', 'Avslag'),
	lagSoknad('7', 'Avslag'),
	lagSoknad('8', 'Engangsstonad'),
	lagSoknad('9', 'Engangsstonad'),
	lagSoknad('10', 'ManuellVurdering'),
	lagSoknad('11', 'ManuellVurdering'),
	lagSoknad('12', 'ManuellVurdering'),
];

describe('genererUttrekk', () => {
	test('fordeler proporsjonalt per vedtakstype', () => {
		const uttrekk = genererUttrekk(soknader, 50);

		const innvilget = uttrekk.filter((sak) => sak.vedtak.type === 'Innvilget');
		const avslag = uttrekk.filter((sak) => sak.vedtak.type === 'Avslag');
		const engangsstonad = uttrekk.filter(
			(sak) => sak.vedtak.type === 'Engangsstonad',
		);
		const manuellVurdering = uttrekk.filter(
			(sak) => sak.vedtak.type === 'ManuellVurdering',
		);

		expect(innvilget.length).toBe(2);
		expect(avslag.length).toBe(2);
		expect(engangsstonad.length).toBe(1);
		expect(manuellVurdering.length).toBe(2);
	});

	test('returnerer tom liste for lav prosent', () => {
		const uttrekk = genererUttrekk(soknader, 1);

		expect(uttrekk.length).toBe(0);
	});

	test('returnerer alle saker for 100%', () => {
		const uttrekk = genererUttrekk(soknader, 100);

		expect(uttrekk.length).toBe(soknader.length);
	});
});
