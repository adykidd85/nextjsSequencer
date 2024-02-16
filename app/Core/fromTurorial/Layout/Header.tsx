import { useAuth } from '@/components/Core/Auth';
import { Button, H5 } from '@burstsms/react-components';
import { Container } from './Header.styles';

interface Props {
	title: string;
}

export function Header({ title }: Props) {
	const auth = useAuth();

	return (
		<Container>
			<H5>{title}</H5>

			{auth.isAuthenticated && (
				<Button onClick={auth.logOut} variant="tertiary" size="small">
					Logout
				</Button>
			)}
		</Container>
	);
}
