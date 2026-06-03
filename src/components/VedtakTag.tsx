import { Tag } from '@navikt/ds-react';

type Props = {
	type: string;
};

function VedtakTag({ type }: Props) {
	switch (type) {
		case 'Innvilget':
			return <Tag variant="success">Innvilget</Tag>;
		case 'Avslag':
			return <Tag variant="error">Avslag</Tag>;
		case 'ManuellVurdering':
			return <Tag variant="warning">Manuell vurdering</Tag>;
		case 'Engangsstonad':
			return <Tag variant="info">Engangsstønad</Tag>;
		default:
			return <Tag variant="neutral">{type}</Tag>;
	}
}

export default VedtakTag;
