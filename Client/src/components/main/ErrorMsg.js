import"./ErrorMsg.css";

export default function ErrorMsg({ message }) {
    return (
        <div className="error-msg">
            <div>Error: {message}</div>
        </div>
    );
}
