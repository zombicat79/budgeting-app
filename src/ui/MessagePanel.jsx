function MessagePanel({ messages }) {
    return (
        <div className="mb-12">
            <ul>
            {messages.map((msg) => {
                return <p key={msg.data}>{msg.body}<span className="font-bold">{msg.data}</span></p>
            })}
            </ul>
        </div>
    )
}

export default MessagePanel;