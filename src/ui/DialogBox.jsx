function DialogBox({ title, msg, actions}) {
    console.log(title)

    return (
        <div>
            <h3>{title}</h3>
            <p>{msg}</p>
            <div>
            {actions.map((el) => {
                return <button key={el.id}>{el.text}</button>
            })}    
            </div>
        </div>
    )
}

export default DialogBox