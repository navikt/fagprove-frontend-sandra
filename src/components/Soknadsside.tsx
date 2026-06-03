import { Button, VStack } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import type { BehandletSoknad } from '../api/types';
import SoknadInfo from './SoknadInfo';
import Inntektshistorikk from './Inntektshistorikk';

type Props = {
	behandletSoknad: BehandletSoknad;
	onTilbake: () => void;
};

function Soknadsside({ behandletSoknad, onTilbake }: Props) {
	const { soknad } = behandletSoknad;

	return (
		<VStack gap="space-8">
			<div>
				<Button
					variant="tertiary"
					size="small"
					icon={<ChevronLeftIcon />}
					onClick={onTilbake}
				>
					Gå tilbake
				</Button>
			</div>

			<SoknadInfo behandletSoknad={behandletSoknad} />
			<Inntektshistorikk inntektshistorikk={soknad.inntektshistorikk} />
		</VStack>
	);
}

export default Soknadsside;
