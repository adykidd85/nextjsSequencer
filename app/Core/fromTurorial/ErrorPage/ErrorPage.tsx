import { Meta } from '@/components/Core/Meta';
import { Body1, Button, H2, Spacing } from '@burstsms/react-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Container } from './ErrorPage.styles';
import manQuestionMarkImage from './man-question-mark.png';

const GlobalStyle = createGlobalStyle`
	${normalize}
`;

export type ErrorCode = 404 | 500;

interface Props {
	code: ErrorCode;
}

export function ErrorPage({ code }: Props) {
	const router = useRouter();

	function handleGoHome() {
		router.push('https://burst.transmitsms.com/overview');
	}

	return (
		<>
			<GlobalStyle />
			<Meta title="Page not found" />

			<Container>
				<Image
					src={manQuestionMarkImage}
					alt="Illustration of a man with a question mark above his head"
					width={320}
					height={146}
				/>
				<H2>Page not found</H2>
				<Body1>The page you are looking for does not exist or is no longer here.</Body1>
				<Spacing height={32} />
				<Button variant="tertiary" onClick={handleGoHome}>
					Home
				</Button>
			</Container>
		</>
	);
}
