import UserLibraryBought from './userLibraryBought.tsx';

function UserLibrary() {
	return (
		<div className="card">
			<div className="card-body">
				<h1 className="card-title">Comprados</h1>
				<div>
					<UserLibraryBought></UserLibraryBought>
				</div>
			</div>
		</div>
	);
}

export default UserLibrary;
