import React from 'react'
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Topics from '@/app/Topics';
import Activity from '@/app/Activity';
import Feed from '@/app/Feed';
import { Container, Grid } from '@mui/material';

function UserProfileClient({serverMessages, serverRooms, serverTopics}) {
    const { user } = useContext(AuthContext);

     return (
        <>
			<Container sx={{ mt: "2.4rem" }}>
				<Grid container spacing={3} sx={{ m: "auto" }}>
                        {/* Topics Start */}
					<Grid xs={3}>
						<Topics serverTopics={serverTopics} serverRooms={serverRooms} />
					</Grid>
                        {/* Topics End */}

            {/* Room List Start */}
            <Grid xs={6}>

                <div className="roomList">
                    <div className="profile">
                        <div className="profile__avatar">
                            <div className="avatar avatar--large active">
                                <img src="{{ user.avatar.url }}" />
                            </div>
                        </div>
                        <div className="profile__info">
                            <h3>{ user.username }</h3>
                            <p>@{ user.username }</p>
                            {/* // {% if request.user == user %} */}
                            <Link href="{% url 'update-user' %}" className="btn btn--main btn--pill">Edit Profile</Link>
                            {/* // {% endif %} */}
                        </div>
                        <div className="profile__about">
                            <h3>About</h3>
                            <p>
                            { user.bio }
                            </p>
                        </div>
                    </div>

                    <div className="roomList__header">
                        <div>
                            <h2>Study Rooms Hosted by { user.username }</h2>
                        </div>
                    </div>
            
                    <Feed serverRooms={serverRooms}/>
                </div>
            </Grid>

            {/*  Room List End */}
            
            {/*  Activities Start */}
            <Grid xs={3}>
                <Activity serverMessages={serverMessages}/>
            </Grid>
            {/*  Activities End */}
				</Grid>
			</Container>
    </>
  )
}



