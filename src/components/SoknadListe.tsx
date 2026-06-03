import { Button, Heading, Pagination, Table, VStack } from '@navikt/ds-react';
import type { BehandletSoknad } from '../api/types';

const ANTALL_SOKNADER_PER_SIDE = 5;

type Props = {
	soknader: BehandletSoknad[];
	onVelgSoknad: (soknad: BehandletSoknad) => void;
	side: number;
	onSideEndring: (side: number) => void;
};

function SoknadListe({ soknader, onVelgSoknad, side, onSideEndring }: Props) {
	const antallSider = Math.ceil(soknader.length / ANTALL_SOKNADER_PER_SIDE);
	const synligeSoknader = soknader.slice(
		(side - 1) * ANTALL_SOKNADER_PER_SIDE,
		side * ANTALL_SOKNADER_PER_SIDE,
	);

	return (
		<VStack gap="space-12">
			<Heading level="2" size="medium" spacing>
				Søknader
			</Heading>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Id</Table.HeaderCell>
						<Table.HeaderCell>Fødselsnummer</Table.HeaderCell>
						<Table.HeaderCell>Termindato</Table.HeaderCell>
						<Table.HeaderCell>Handling</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{synligeSoknader.map((behandletSoknad) => (
						<Table.Row key={behandletSoknad.soknad.id}>
							<Table.DataCell>{behandletSoknad.soknad.id}</Table.DataCell>
							<Table.DataCell>{behandletSoknad.soknad.fnr}</Table.DataCell>
							<Table.DataCell>
								{behandletSoknad.soknad.termindato}
							</Table.DataCell>
							<Table.DataCell>
								<Button
									size="small"
									onClick={() => onVelgSoknad(behandletSoknad)}
								>
									Åpne sak
								</Button>
							</Table.DataCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			{antallSider > 1 && (
				<Pagination
					page={side}
					onPageChange={onSideEndring}
					count={antallSider}
					size="small"
				/>
			)}
		</VStack>
	);
}

export default SoknadListe;
