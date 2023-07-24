function padZero(n: number) {
    return (100 + n).toString().substring(1)
}

export function formatTime(t: number) {
    const ret: string[] = []
    const BASE = 60
    let remain = t

    while (remain >= BASE) {
        ret.push(padZero(Math.ceil(remain % 60)))
        remain = Math.floor(remain / BASE)
    }

    ret.unshift(padZero(Math.ceil(remain)))

    if (ret.length === 1) {
        ret.unshift("00")
    }

    return ret.join(":")
}