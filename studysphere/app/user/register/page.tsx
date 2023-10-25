import Link from 'next/link';
import { RegisterForm } from '@/components/forms';
import type { Metadata } from 'next';
import "../../../styles/Auth.css";

export const metadata: Metadata = {
	title: 'Full Auth | Register',
	description: 'Full Auth register page',
};

function Page() {


	return (
		<main className="auth layout">
			<div className="container">
				<div className="layout__box">
					<div className="layout__boxHeader">
						<div className="layout__boxTitle">
							<h3>Register</h3>
						</div>
					</div>
					<div className="layout__body">
						<h2 style={{ marginBottom: "2rem" }}>Find your study partner</h2>

						<RegisterForm/>


						<div className="auth__action">
							<p>Already signed up ?</p>
							<Link href={'/user/login'} className="btn btn--link">
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Page;
