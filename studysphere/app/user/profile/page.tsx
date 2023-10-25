"use client"

import Link from 'next/link';
import Topics from '@/app/Topics';
import Activity from '@/app/Activity';
import Feed from '@/app/Feed';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import './styles.css'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";


function UserProfile() {
    const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

    return (
        <>
            <Container className="profile-page" sx={{ mt: "2.4rem" }}>
                <Grid container spacing={3} sx={{ m: "auto" }}>
                    {/* Topics Start */}
                    <Grid xs={3}>
                        <Topics />
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
                                    <p>@{user?.username}</p>
                                    <Link href="{% url 'update-user' %}" className="btn btn--main btn--pill">Edit Profile</Link>
                                </div>
                                <div className="profile__about">
                                    {/* <h3>About</h3>
                                    <p>
                                        {user?}
                                    </p> */}
                                </div>
                            </div>

                            <div className="roomList__header">
                                <div>
                                    <h2>Study Rooms Hosted by {user?.username}</h2>
                                </div>
                            </div>

                            <Feed />
                        </div>
                    </Grid>

                    {/*  Room List End */}

                    {/*  Activities Start */}
                    <Grid xs={3}>
                        <Activity />
                    </Grid>
                    {/*  Activities End */}
                </Grid>
            </Container>
        </>
    )
}

export default UserProfile


