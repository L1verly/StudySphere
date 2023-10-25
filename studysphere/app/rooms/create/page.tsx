import CreateRoomForm from "@/components/forms/CreateRoomForm";
import Link from "next/link";

type Props = {}

function CreateRoom({}: Props) {

    return (
        <main className="create-room layout">
            <div className="container">
                <div className="layout__box">
                    <div className="layout__boxHeader">
                        <div className="layout__boxTitle">
                            <Link href={'/'}>
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                >
                                    <title>arrow-left</title>
                                    <path
                                        d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                                    ></path>
                                </svg>
                            </Link>
                            <h3>Create/Update Study Room</h3>
                        </div>
                    </div>
                    <div className="layout__body">
                        
                        <CreateRoomForm />

                    </div>
                </div>
            </div>
        </main>  )
}

export default CreateRoom