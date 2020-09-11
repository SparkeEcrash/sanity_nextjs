
import { Alert } from 'react-bootstrap';


export default function PreviewAlert({message}) {
	return (
		<Alert variant="secondary">
			{message}{' '}
			{/* TODO: This will lead me to API route that will remove preview cookies */}
			<Alert.Link href="/api/exit-preview">Leave preview mode</Alert.Link>
		</Alert>
	)
} 