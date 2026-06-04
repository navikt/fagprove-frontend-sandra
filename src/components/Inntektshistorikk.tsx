import { Box, Heading, Table } from '@navikt/ds-react';
import type { Inntekt } from '../api/types';

type Props = {
	inntektshistorikk: Inntekt[];
};

function formaterManed(maned: string) {
	const [aar, manedNr] = maned.split('-');
	const manedNavn = [
		'Januar',
		'Februar',
		'Mars',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Desember',
	];
	return `${manedNavn[parseInt(manedNr) - 1] ?? maned} ${aar}`;
}

function formaterInntektstype(type: string) {
	switch (type) {
		case 'ARBEID':
			return 'Arbeid';
		case 'SYKEPENGER':
			return 'Sykepenger';
		case 'FORELDREPENGER':
			return 'Foreldrepenger';
		case 'SVANGERSKAPSPENGER':
			return 'Svangerskapspenger';
		case 'DAGPENGER':
			return 'Dagpenger';
		case 'AAP':
			return 'AAP';
		case 'PLEIEPENGER':
			return 'Pleiepenger';
		case 'STIPEND_LANEKASSEN':
			return 'Stipend';
		default:
			return type;
	}
}

function Inntektshistorikk({ inntektshistorikk }: Props) {
	return (
		<Box background="neutral-soft" padding="space-16" borderRadius="4">
			<Heading level="3" size="small" spacing>
				Inntektshistorikk
			</Heading>
			<Table size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Måned</Table.HeaderCell>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell align="right">Beløp</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{inntektshistorikk.map((inntekt) => (
						<Table.Row key={inntekt.maned}>
							<Table.DataCell>{formaterManed(inntekt.maned)}</Table.DataCell>
							<Table.DataCell>
								{formaterInntektstype(inntekt.type)}
							</Table.DataCell>
							<Table.DataCell align="right">
								{inntekt.belop.toLocaleString('nb-NO')} kr
							</Table.DataCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Box>
	);
}

export default Inntektshistorikk;
