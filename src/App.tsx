import { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react/Typography';
import { hentSoknader } from './api/api';
import type { BehandletSoknad } from './api/types';
import SoknadListe from './components/SoknadListe';
import { Page } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';
import Soknadsside from './components/Soknadsside';

function App() {
	const [soknader, setSoknader] = useState<BehandletSoknad[]>([]);
	const [valgtSoknad, setValgtSoknad] = useState<BehandletSoknad | null>(null);
	const [side, setSide] = useState(1);

	useEffect(() => {
		hentSoknader().then(setSoknader);
	}, []);

	return (
		<Page>
			<Page.Block as="header" width="xl" gutters>
				<Box paddingBlock="space-24 space-0">
					<Heading level="1" size="large" spacing>
						Forenklet saksbehandlingssystem for foreldrepenger
					</Heading>
				</Box>
			</Page.Block>
			<Page.Block as="main" width="xl" gutters>
				{valgtSoknad ? (
					<Soknadsside
						behandletSoknad={valgtSoknad}
						onTilbake={() => setValgtSoknad(null)}
					/>
				) : (
					<SoknadListe
						soknader={soknader}
						onVelgSoknad={setValgtSoknad}
						side={side}
						onSideEndring={setSide}
					/>
				)}
			</Page.Block>
		</Page>
	);
}

export default App;
