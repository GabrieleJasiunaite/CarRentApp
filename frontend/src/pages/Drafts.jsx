import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DraftCard from "../components/DraftCard";

const Drafts = () => {
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        // setDrafts(localStorage.getItem('drafts'));
        setDrafts([{ brand: "Volvo", year: 2014, date: "2024-01-10" }, { brand: "Audi", model: "A8", date: "2024-01-09" }])
    }, []);

    const handleClick = (draft) => {
        //     return navigate('/cars/new', { state: { draft } });
        //     // new page padaryt patikrinimą ar propsuose atkeliauja kažkas, jei ne
        //     // forma tuščia, jei yra dalykų, setState padaryt atitinkamus.
        //     // props permest ten su: const location = useLocation();
        //     // const {state} = location.state
    };

    return (
        <div className="container">
            <h2 className="drafts-heading">Juodraščiai</h2>
            <div className="drafts-grid">
                {drafts.map((draft, i) => (
                    <DraftCard key={i} draft={draft} handleClick={handleClick} />
                ))}
            </div>
        </div>
    );
};

export default Drafts;