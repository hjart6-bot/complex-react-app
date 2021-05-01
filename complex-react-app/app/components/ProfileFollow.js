import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Profile from "./Profile"
import StateContext from "../StateContext"

function ProfileFollow(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const appState = useContext(StateContext)
  const profileData = props.profileData

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.action == "following" ? "following" : "followers"}`, { cancelToken: ourRequest.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username, props.action])

  if (isLoading) return <LoadingDotsIcon />

  //if you dont have any followers you get this message
  if (profileData.counts.followerCount == 0 && appState.user.username == profileData.profileUsername && props.action == "followers")
    return (
      <div className="list-group">
        <p>You don't have any followers yet :-(. Try writing some articles!</p>
      </div>
    )
  else if (profileData.counts.followerCount == 0 && appState.user.username != profileData.profileUsername && props.action == "followers")
    return (
      <div className="list-group">
        <p>This user does not have any followers yet. Maybe you could be the first?</p>
      </div>
    )
  else if (profileData.counts.followingCount == 0 && appState.user.username != profileData.profileUsername && props.action == "following")
    return (
      <div className="list-group">
        <p>This user isn't following anyone yet.</p>
      </div>
    )
  else if (profileData.counts.followingCount == 0 && appState.user.username == profileData.profileUsername && props.action == "following")
    return (
      <div className="list-group">
        <p>You aren't following anyone yet.</p>
      </div>
    )
  else
    return (
      <div className="list-group">
        {posts.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
            </Link>
          )
        })}
      </div>
    )
}

export default ProfileFollow
