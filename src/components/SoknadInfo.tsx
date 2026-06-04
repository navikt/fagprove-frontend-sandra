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
import Soknadsdetaljer from './Soknadsdetaljer';
import VedtakTag from './VedtakTag';
import Vedtaksdetaljer from './Vedtaksdetaljer';

type Props = {
	behandletSoknad: BehandletSoknad;
};

function SoknadInfo({ behandletSoknad }: Props) {
	const { soknad, vedtak } = behandletSoknad;

	return (
		<VStack gap="space-8">
			<VStack gap="space-4">
				<Heading level="2" size="medium">
					Søknad for {soknad.fnr}
				</Heading>
				<BodyShort textColor="subtle">Id: {soknad.id}</BodyShort>
			</VStack>

			<Box background="neutral-soft" padding="space-16" borderRadius="4">
				<HStack gap="space-4" align="center">
					<Label as="span">Vedtak:</Label>
					<VedtakTag type={vedtak.type} />
				</HStack>
			</Box>

			<HGrid columns={{ xs: 1, md: 2 }} gap="space-8">
				<Soknadsdetaljer soknad={soknad} />
				<Vedtaksdetaljer vedtak={vedtak} />
			</HGrid>
		</VStack>
	);
}

export default SoknadInfo;
