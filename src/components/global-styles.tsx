import {Global} from "@emotion/react"

export default function GlobalStyles() {
    return (
        <Global styles={{
            "*": {
                boxSizing: "border-box"
            },
            "body": {
                margin: 0,
            }
        }}/>
    )
}