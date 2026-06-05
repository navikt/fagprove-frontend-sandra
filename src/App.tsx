import { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react/Typography';
import { hentSoknader } from './api/api';
import type { BehandletSoknad } from './api/types';
import SoknadListe from './pages/SoknadListe';
import { Page } from '@navikt/ds-react/Page';
import { Box, GlobalAlert, Loader } from '@navikt/ds-react';
import Soknadsside from './pages/Soknadsside';

function App() {
	const [soknader, setSoknader] = useState<BehandletSoknad[]>([]);
	const [valgtSoknad, setValgtSoknad] = useState<BehandletSoknad | null>(null);
	const [side, setSide] = useState(1);
	const [laster, setLaster] = useState(true);
	const [feil, setFeil] = useState<string | null>(null);

	useEffect(() => {
		hentSoknader()
			.then(setSoknader)
			.catch((error) => setFeil(error.message))
			.finally(() => setLaster(false));
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
				{laster ? (
					<Loader size="xlarge" title="Laster søknader" />
				) : feil ? (
					<GlobalAlert status="error">
						<GlobalAlert.Header>
							<GlobalAlert.Title>{feil}</GlobalAlert.Title>
						</GlobalAlert.Header>
						<GlobalAlert.Content>
							Kunne ikke laste søknader. Prøv igjen senere.
						</GlobalAlert.Content>
					</GlobalAlert>
				) : valgtSoknad ? (
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
