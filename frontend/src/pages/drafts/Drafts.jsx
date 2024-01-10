import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DraftCard from "../../components/draftCard/DraftCard";
import './drafts.css';

// Component for displaying a list of drafts
const Drafts = () => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        const json = localStorage.getItem('drafts');
        if (!json) {
            return;
        };

        const drafts = JSON.parse(json);
        if (drafts) {
            setDrafts(drafts);
        };
    }, []);

    return (
        <div className="container">
            <div className="drafts">
                <div className="title">
                    <h2 className="drafts-heading">Juodraščiai</h2>
                    <Link to="/new">Atgal</Link>
                </div>
                {drafts.length === 0 && <div className="message">Išsaugotų juodraščių nėra</div>}
                <div className="drafts-grid">
                    {drafts.map((draft, i) => (
                        <DraftCard key={i} allDrafts={drafts} draft={draft} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Drafts;