import React from 'react';
import { ViewContainer, ErrorText, BodyText } from './ErrorPage.styles';

const ErrorPage: React.FC<Record<string, never>> = () => {
	return (
		<ViewContainer>
			<ErrorText>Error</ErrorText>
			<BodyText>
				Sorry! There has been an error. Hang on till we get the error fixed. You
				may also refresh the page or try again later.
			</BodyText>
		</ViewContainer>
	);
};

export default ErrorPage;
