import React, { useEffect } from "react"

//Nested jsx-content is displayed inside a container
function Container(props) {
  return <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow")}>{props.children}</div>
}

export default Container
