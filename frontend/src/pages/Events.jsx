import { useEffect, useState } from "react";
import { api } from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => { api.getEvents().then(setEvents).catch(console.error); }, []);
  return <main className="page-section container"><div className="page-header"><span className="eyebrow">EVENTS</span><h1>Learn, connect and grow.</h1></div><div className="event-list">{events.map((event) => <article className="event-card" key={event.id}><div className="event-date"><strong>{new Date(event.event_date).getDate()}</strong><span>{new Date(event.event_date).toLocaleString("en", { month: "short" })}</span></div><div><span className="eyebrow">{event.event_type}</span><h3>{event.title}</h3><p>{event.description}</p><small>{event.location}</small></div></article>)}</div></main>;
}
