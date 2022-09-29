export default interface WebSocketEventListener {
    listeningEvent: string,
    callback: (...args: any[]) => void
}