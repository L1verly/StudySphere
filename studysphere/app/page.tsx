"use client"
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Topics from "./Topics";
import Activity from "./Activity";
import Feed from "../app/Feed";
import Link from "next/link";

import { useGetRoomsQuery } from "@/redux/features/roomApiSlice";

// // Upload Image
// const photoInput = document.querySelector("#avatar");
// const photoPreview = document.querySelector("#preview-avatar");
// if (photoInput)
// 	photoInput.onchange = () => {
// 		const [file] = photoInput.files;
// 		if (file) {
// 			photoPreview.src = URL.createObjectURL(file);
// 		}
// 	};

// // Scroll to Bottom
// const conversationThread = document.querySelector(".room__box");
// if (conversationThread)
// 	conversationThread.scrollTop = conversationThread.scrollHeight;


function Homepage() {
	const {data: roomList} = useGetRoomsQuery()
	const rooms = roomList?.results


	return (
		<>
			<Container sx={{ mt: "2.4rem" }}>
				<Grid container spacing={3} sx={{ m: "auto" }}>
					<Grid xs={3}>
						<Topics />
					</Grid>
					<Grid xs={6}>
						<div className="roomList">
							<div className="mobile-menu">
								<form
									method="GET"
									action="{{ request.META.HTTP_REFERER }}"
									className="header__search"
								>
									<label>
										<svg
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											viewBox="0 0 32 32"
										>
											<title>search</title>
											<path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"></path>
										</svg>
										<input placeholder="Search for posts" />
									</label>
								</form>
								<div className="mobile-menuItems">
									<Link className="btn btn--main btn--pill" href="/topics">
										Browse Topics
									</Link>
									<Link className="btn btn--main btn--pill" href="/activity">
										Recent Activities
									</Link>
								</div>
							</div>

							<div className="roomList__header">
								<div>
									<h2>Study Rooms</h2>
									<p>{`${rooms?.length} Rooms available`}</p>
								</div>
								<Link
									className="btn btn--main"
									href="/rooms/create/"
								>
									<svg
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 32 32"
									>
										<title>add</title>
										<path d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"></path>
									</svg>
									Create Room
								</Link>
							</div>
						</div>

						<Feed />
					</Grid>
					<Grid xs={3}>
						<Activity />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Homepage;
