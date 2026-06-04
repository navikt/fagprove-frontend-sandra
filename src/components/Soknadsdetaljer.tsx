import { Box, Heading, HGrid, VStack } from '@navikt/ds-react';
import type { Soknad } from '../api/types';
import Felt from './Felt';

type Props = {
	soknad: Soknad;
};

function Soknadsdetaljer({ soknad }: Props) {
	return (
		<Box background="neutral-soft" padding="space-16" borderRadius="4">
			<VStack gap="space-8">
				<Heading level="3" size="small">
					Søknadsdetaljer
				</Heading>
				<HGrid columns={2} gap="space-8">
					<Felt label="Fødselsnummer" verdi={soknad.fnr} />
					<Felt label="Termindato" verdi={soknad.termindato} />
					<Felt
						label="Norsk statsborger"
						verdi={soknad.erNorskBorger ? 'Ja' : 'Nei'}
					/>
					<Felt label="Oppgitt årsinntekt" verdi={soknad.oppgittArsinntekt} />
					<Felt label="Antall barn" verdi={soknad.antallBarn} />
					<Felt label="Rettsforhold" verdi={soknad.rettsforhold} />
					<Felt label="Dekningsgrad" verdi={`${soknad.dekningsgrad}%`} />
				</HGrid>
			</VStack>
		</Box>
	);
}

export default Soknadsdetaljer;
