import { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react/Typography';
import { hentSoknader } from './api/api';
import type { BehandletSoknad } from './api/types';
import SoknadListe from './components/SoknadListe';
import { Page } from '@navikt/ds-react/Page';
import { Box } from '@navikt/ds-react';

function App() {
	const [soknader, setSoknader] = useState<BehandletSoknad[]>([]);

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
				<SoknadListe soknader={soknader} />
			</Page.Block>
		</Page>
	);
}

export default App;
