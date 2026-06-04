import { BodyShort, Label, VStack } from '@navikt/ds-react';

type Props = {
	label: string;
	verdi: string | number;
};

function Felt({ label, verdi }: Props) {
	return (
		<VStack>
			<Label size="small" as="span">
				{label}
			</Label>
			<BodyShort size="small">{verdi}</BodyShort>
		</VStack>
	);
}

export default Felt;
