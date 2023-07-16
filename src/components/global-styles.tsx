import {Global} from "@emotion/react"

export default function GlobalStyles() {
    return (
        <Global styles={{
            "body": {
                margin: 0,
            }
        }}/>
    )
}