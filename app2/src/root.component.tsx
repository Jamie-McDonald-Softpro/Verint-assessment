import { useState, useEffect } from "react";
// @ts-ignore
import { publish, subscribe } from "@verint/events";

export default function Root(props: any) {
  const [messages, setMessages] = useState<String[]>([]);

  const handleClick = () => {
    publish({ type: "message-from-app2", payload: "Hello from app 2" });
  };

  useEffect(() => {
    const subscriptions: any = subscribe((event) => {
      if (event.type === "message-from-app1") {
        setMessages((prevMsgs) => [
          ...prevMsgs,
          `${event.payload} ${new Date().toString()}`
        ]);
      }
    });

    return () => subscriptions.unsubscribe();
  }, []);

  return (
    <section>
      <p>{props.name} is mounted!</p>
      <button onClick={handleClick}>Send message to app1</button>

      <p>Messages from app1:</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </section>
  );
}
