import Link from "next/link";
import React from "react";

const Contact = () => {
	return (
		<>
			<div className="section-feedback ">
				<div className="card-cta">
					<div className="flex flex-col gap-6  ">
						<h1 className="text-4xl font-semibold">Welcome!</h1>
						<h2 className="text-4xl font-semibold">Want to reach out?</h2>
						<div className="flex gap-5 mt-3">
							<div className="flex gap-2 items-center">
								<Link href="tel:08149319696">Tel:+2348149319696</Link>
							</div>
							<div className="flex gap-2">
								<Link href="mailto:asherdevs1@gmail.com">
									Email: asherdevs1@gmail.com
								</Link>
							</div>
						</div>
					</div>
				</div>
				<hr />
			</div>
		</>
	);
};

export default Contact;
