import { useState } from 'react';
import {
	BodyShort,
	Button,
	Chips,
	HStack,
	InlineMessage,
	Modal,
	Table,
	TextField,
	VStack,
} from '@navikt/ds-react';
import type { BehandletSoknad } from '../api/types';
import VedtakTag from './VedtakTag';
import { genererUttrekk } from '../utils/uttrekk';

type Props = {
	soknader: BehandletSoknad[];
	open: boolean;
	onClose: () => void;
};

function hentVedtakstyper(soknader: BehandletSoknad[]): string[] {
	return soknader
		.map((sak) => sak.vedtak.type)
		.filter((type, index, typer) => typer.indexOf(type) === index);
}

function StikkproveModal({ soknader, open, onClose }: Props) {
	const [prosentInput, setProsentInput] = useState('');
	const [feilmelding, setFeilmelding] = useState('');
	const [uttrekk, setUttrekk] = useState<BehandletSoknad[]>([]);
	const [harGenerert, setHarGenerert] = useState(false);
	const [aktiveFiltre, setAktiveFiltre] = useState<string[]>([]);

	const vedtakstyper = hentVedtakstyper(uttrekk);

	const filtrertUttrekk = uttrekk.filter((sak) =>
		aktiveFiltre.includes(sak.vedtak.type),
	);

	function handleGenerer() {
		const prosent = Number(prosentInput);

		if (isNaN(prosent) || prosent <= 0 || prosent > 100) {
			setFeilmelding('Oppgi en verdi mellom 1 og 100');
			return;
		}

		setFeilmelding('');
		const nyttUttrekk = genererUttrekk(soknader, prosent);
		setHarGenerert(true);
		setUttrekk(nyttUttrekk);
		setAktiveFiltre(hentVedtakstyper(nyttUttrekk));
	}

	function handleClose() {
		setProsentInput('');
		setFeilmelding('');
		setUttrekk([]);
		setHarGenerert(false);
		setAktiveFiltre([]);
		onClose();
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			header={{ heading: 'Stikkprøvekontroll' }}
			width="medium"
		>
			<Modal.Body>
				<VStack gap="space-16">
					<HStack gap="space-8" align="end">
						<TextField
							label="Andel saker (%)"
							size="medium"
							type="number"
							value={prosentInput}
							onChange={(e) => setProsentInput(e.target.value)}
							error={feilmelding || undefined}
							style={{ width: '120px' }}
						/>
						<Button size="medium" onClick={handleGenerer}>
							Generer uttrekk
						</Button>
					</HStack>

					{harGenerert && uttrekk.length === 0 && (
						<InlineMessage status="info">
							Prosenten er for lav til å trekke ut noen saker. Prøv en høyere
							verdi.
						</InlineMessage>
					)}

					{uttrekk.length > 0 && (
						<>
							<BodyShort>
								Trukket ut {uttrekk.length} av {soknader.length} saker
							</BodyShort>

							{vedtakstyper.length > 1 && (
								<Chips>
									{vedtakstyper.map((type) => (
										<Chips.Toggle
											key={type}
											selected={aktiveFiltre.includes(type)}
											onClick={() =>
												setAktiveFiltre(
													aktiveFiltre.includes(type)
														? aktiveFiltre.filter((t) => t !== type)
														: [...aktiveFiltre, type],
												)
											}
										>
											{type}
										</Chips.Toggle>
									))}
								</Chips>
							)}

							{aktiveFiltre.length === 0 ? (
								<InlineMessage status="info">
									Velg et eller flere filtre for å se saker
								</InlineMessage>
							) : (
								<Table size="small" zebraStripes>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Id</Table.HeaderCell>
											<Table.HeaderCell>Vedtak</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{filtrertUttrekk.map((sak) => (
											<Table.Row key={sak.soknad.id}>
												<Table.DataCell>{sak.soknad.id}</Table.DataCell>
												<Table.DataCell>
													<VedtakTag type={sak.vedtak.type} />
												</Table.DataCell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
							)}
						</>
					)}
				</VStack>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Lukk
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default StikkproveModal;
