import {
	BodyShort,
	Box,
	Heading,
	HGrid,
	HStack,
	Label,
	VStack,
} from '@navikt/ds-react';
import type { BehandletSoknad } from '../api/types';
import VedtakTag from './VedtakTag';

type Props = {
	behandletSoknad: BehandletSoknad;
};

function Felt({ label, verdi }: { label: string; verdi: string | number }) {
	return (
		<HStack gap="space-8" align="center">
			<Label size="small" as="span">
				{label}:
			</Label>
			{verdi}
		</HStack>
	);
}

function SoknadInfo({ behandletSoknad }: Props) {
	const { soknad, vedtak } = behandletSoknad;

	return (
		<VStack gap="space-8">
			<Box background="neutral-soft" padding="space-16" borderRadius="4">
				<HStack justify="space-between" align="start">
					<VStack gap="space-4">
						<Heading level="2" size="medium">
							Søknad for {soknad.fnr}
						</Heading>
						<BodyShort textColor="subtle">Id: {soknad.id}</BodyShort>
					</VStack>
					<HStack gap="space-4" align="center">
						<VedtakTag type={vedtak.type} />
					</HStack>
				</HStack>
			</Box>

			<Box padding="space-16">
				<HGrid columns={2} gap="space-2">
					<Felt label="Fnr" verdi={soknad.fnr} />
					<Felt label="Antall barn" verdi={soknad.antallBarn} />
					<Felt label="Termindato" verdi={soknad.termindato} />
					<Felt label="Rettsforhold" verdi={soknad.rettsforhold} />
					<Felt
						label="Norsk statsborger"
						verdi={soknad.erNorskBorger ? 'Ja' : 'Nei'}
					/>
					<Felt label="Dekningsgrad" verdi={`${soknad.dekningsgrad}%`} />
					<Felt label="Oppgitt årsinntekt" verdi={soknad.oppgittArsinntekt} />
				</HGrid>
			</Box>
		</VStack>
	);
}

export default SoknadInfo;
