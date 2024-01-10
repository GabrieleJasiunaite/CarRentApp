import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DraftCard from "../components/DraftCard";

// Component for displaying a list of drafts
const Drafts = () => {
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        // setDrafts(localStorage.getItem('drafts'));
        setDrafts([{ brand: "Volvo", year: 2014, date: "2024-01-10" }, { brand: "Audi", model: "A8", date: "2024-01-09" }])
    }, []);
// Handler for clicking on a draft card
    const handleClick = (draft) => {
        //     return navigate('/cars/new', { state: { draft } });
        //     // new page padaryt patikrinimą ar propsuose atkeliauja kažkas, jei ne
        //     // forma tuščia, jei yra dalykų, setState padaryt atitinkamus.
        //     // props permest ten su: const location = useLocation();
        //     // const {state} = location.state
    };

    return (
        <div className="container">
            <div className="drafts">
                <div className="title">
                    <h2 className="drafts-heading">Juodraščiai</h2>
                    <Link to="/new">Atgal</Link>
                </div>
                <div className="drafts-grid">
                    {drafts.map((draft, i) => (
                        <DraftCard key={i} draft={draft} handleClick={handleClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Drafts;