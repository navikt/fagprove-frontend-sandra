export type Vedtak =
	| { type: 'Avslag' }
	| { type: 'Engangsstonad' }
	| { type: 'ManuellVurdering' }
	| {
			type: 'Innvilget';
			beregningsgrunnlag: number;
			stonadsperiodeUker: number;
			kvoter: {
				modrekvote: number;
				fedrekvote: number;
				fellesperiode: number;
				forhandskvote: number;
				flerbarnsbonus: number;
			};
	  };

export type Inntekt = {
	maned: string;
	type: string;
	belop: number;
};

export type Soknad = {
	id: string;
	beskrivelse: string;
	fnr: string;
	erNorskBorger: boolean;
	termindato: string;
	oppgittArsinntekt: number;
	inntektshistorikk: Inntekt[];
	antallBarn: number;
	rettsforhold: string;
	dekningsgrad: number;
};

export type BehandletSoknad = {
	soknad: Soknad;
	vedtak: Vedtak;
};
