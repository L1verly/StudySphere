"use client"
import Link from "next/link";
import "../styles/Topics.css";
import { useGetRoomsQuery } from "@/redux/features/roomApiSlice";
import { useGetTopicsQuery } from "@/redux/features/topicApiSlice";


function Topics() {

	// function getServerValues() {
	// 	const { data: roomList, error: errorRoom} = useGetRoomsQuery()
	// 	const { data: topicList, error: errorTopic } = useGetTopicsQuery()

	// 	if (roomList && topicList) {
	// 		const rooms = roomList?.results
	// 		const topics = topicList?.results
	// 		return { rooms, topics }
	// 	}
	// 	// else {
	// 	// 	console.log(errorRoom.status)
	// 	// 	console.log(errorTopic.status)

	// 	// }
	// }

	// const { rooms, topics }  = getServerValues()
	const { data: roomList } = useGetRoomsQuery()
	const { data: topicList } = useGetTopicsQuery()

	const rooms = roomList?.results
	const topics = topicList?.results
	
	return (
		<div className="topics">
			<section className="topics__header">
				<h2>Browse Topics</h2>
			</section>
			<ul className="topics__list">
				<li>
					<Link href="/" className="active">
						All <span>{topics?.length}</span>
					</Link>
				</li>
				{topics?.map((topic) => (
					<li key={topic.id}>
						<Link
							href="/rooms/"
						>
							{ topic.name } 
							<span>{ rooms?.filter((room)=> topic.name === room.topic?.name).length }</span>
						</Link>
					</li>
				))}
			</ul>
			<Link className="btn btn--link" href="/topics">
				More
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 32 32"
				>
					<title>chevron-down</title>
					<path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
				</svg>
			</Link>
		</div>
	);
}

export default Topics;
