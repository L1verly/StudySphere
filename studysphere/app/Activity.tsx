"use client"
import Link from "next/link";
import "../styles/Activity.css";
import moment from "moment";
import Image from "next/image";
import manAvatar from "@/public/images/philipp-wuthrich-5n3JP9WAJTs-unsplash.jpg";
import { useGetMessagesQuery } from "@/redux/features/messageApiSlice";
import { useGetTopicsQuery } from "@/redux/features/topicApiSlice";
import { useGetRoomQuery } from "@/redux/features/roomApiSlice";


function Activity() {

	const { data: messageList } = useGetMessagesQuery()
	const messages = messageList?.results

	function getRoomById(id) {
		const {data:room} = useGetRoomQuery(id)
		return room
	}
	return (
		<div className="activities">
			<div className="activities__header">
				<h2>Recent Activities</h2>
			</div>

			{messages?.map((message) => (
				<div className="activities__box">
					<div className="activities__boxHeader roomListRoom__header">
						<Link href={`/user/${message?.user}`} className="roomListRoom__author">
							<div className="avatar avatar--small">
								<Image src={manAvatar} alt="manAvatar"></Image> 
							</div>
							<p>
								@{message.user}
								<span>{moment(message?.created).from(moment())}</span>
							</p>
						</Link>
						{/* {% if request.user === message.user %} */}
						<div className="roomListRoom__actions">
							<Link href={`/delete/${message.id}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 32 32"
								>
									<title>remove</title>
									<path d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"></path>
								</svg>
							</Link>
						</div>
						{/* {% endif %} */}
					</div>
					<div className="activities__boxContent">
						<p>
							commented in room "
							<Link href={`/room/${message.room}`}>	
								{message.room}
							</Link>
							"
						</p>
						<div className="activities__boxRoomContent">
							{ message.body }
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Activity;
