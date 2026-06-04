import { Box, HGrid, Label, VStack, Heading } from '@navikt/ds-react';
import type { Vedtak } from '../api/types';
import Felt from './Felt';

type Props = {
	vedtak: Vedtak;
};

function Vedtaksdetaljer({ vedtak }: Props) {
	return (
		<Box background="neutral-soft" padding="space-16" borderRadius="4">
			<VStack gap="space-8">
				<Heading level="3" size="small">
					Vedtaksdetaljer
				</Heading>
				{(vedtak.type === 'Avslag' || vedtak.type === 'ManuellVurdering') && (
					<Felt label="Begrunnelse" verdi={vedtak.begrunnelse} />
				)}
				{vedtak.type === 'Engangsstonad' && (
					<>
						<Felt label="Begrunnelse" verdi={vedtak.begrunnelse} />
						<Felt
							label="Beløp"
							verdi={`${vedtak.belop.toLocaleString('nb-NO')} kr`}
						/>
					</>
				)}
				{vedtak.type === 'Innvilget' && (
					<>
						<HGrid columns={2} gap="space-8">
							<Felt
								label="Beregningsgrunnlag"
								verdi={`${vedtak.beregningsgrunnlag.toLocaleString('nb-NO')} kr`}
							/>
							<Felt
								label="Stønadsperiode"
								verdi={`${vedtak.stonadsperiodeUker} uker`}
							/>
						</HGrid>
						<VStack gap="space-4">
							<Label size="small" as="span">
								Kvoter
							</Label>
							<HGrid columns={2} gap="space-8">
								<Felt
									label="Mødrekvote"
									verdi={`${vedtak.kvoter.modrekvote} uker`}
								/>
								<Felt
									label="Fedrekvote"
									verdi={`${vedtak.kvoter.fedrekvote} uker`}
								/>
								<Felt
									label="Fellesperiode"
									verdi={`${vedtak.kvoter.fellesperiode} uker`}
								/>
								<Felt
									label="Forhåndskvote (mor)"
									verdi={`${vedtak.kvoter.forhandskvote} uker`}
								/>
								<Felt
									label="Flerbarnsbonus"
									verdi={
										vedtak.kvoter.flerbarnsbonus > 0
											? `${vedtak.kvoter.flerbarnsbonus} uker`
											: 'ingen'
									}
								/>
							</HGrid>
						</VStack>
					</>
				)}
			</VStack>
		</Box>
	);
}

export default Vedtaksdetaljer;
