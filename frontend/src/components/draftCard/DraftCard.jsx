import { useNavigate } from "react-router-dom";
import './draftCard.css';

// Component for displaying a draft card
const DraftCard = ({ allDrafts, draft }) => {
    const navigate = useNavigate();

    // Toggle visibility of delete button on mouse enter/leave
    const handleMouseEnter = (e) => {
        if (e && e.target.children[0])
            e.target.children[0].children[1].classList.toggle("hidden");
        e.currentTarget.lastChild.classList.toggle("hidden");
    };


    const handleMouseLeave = (e) => {
        if (e && e.target.children[0]) {
            e.target.children[0].children[1].classList.toggle("hidden");
            // kartais kažką padarius meta error, kad children[0] is undefined, nežinau kaip triggerint errorą, bandysiu errorus catchint
            e.currentTarget.lastChild.classList.toggle("hidden");
        };
    };

    const deleteFromStorage = (id) => {
        const filtered = allDrafts.filter(draft => draft.id !== id);
        localStorage.setItem('drafts', JSON.stringify(filtered));
    };

    const handleDelete = (e, id) => {
        if (e.target.classList && e.target.parentElement.classList) {
            e.target.classList.add('disabled');
            e.target.parentElement.classList.add('disabled');
            deleteFromStorage(id);
        };
    };

    const handleClick = (id) => {
        deleteFromStorage(id);
        return navigate('/new', { state: draft });
    };

    return (
        <div className="draft-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <div className="clickable-div" onClick={() => handleClick(draft.id)} >
                <div className="text">
                    <strong>Juodraštis</strong>
                    {draft.brand ? (
                        <span className="draft-title">{draft.brand}</span>
                    ) : (
                        <span className="draft-title">(modelis nepasirinktas)</span>
                    )}
                </div>
                <span className="draft-date">{draft.date}</span>
            </div>
            <button onClick={(e) => handleDelete(e, draft.id)} className="hidden">Ištrinti</button>
        </div >
    );
};

export default DraftCard;