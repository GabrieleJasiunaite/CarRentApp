import { useNavigate } from "react-router-dom";

const DraftCard = ({ allDrafts, draft }) => {
    const navigate = useNavigate();

    const handleMouseEnter = (e) => {
        e.target.children[0].children[1].classList.toggle("hidden");
        e.currentTarget.lastChild.classList.toggle("hidden");
    };

    const handleMouseLeave = (e) => {
        e.target.children[0].children[1].classList.toggle("hidden");
        // kartais kažką padarius meta error, kad children[0] is undefined, nežinau kaip triggerint errorą, bandysiu errorus catchint
        e.currentTarget.lastChild.classList.toggle("hidden");
    };

    const deleteFromStorage = (id) => {
        const filtered = allDrafts.filter(draft => draft.id !== id);
        localStorage.setItem('drafts', JSON.stringify(filtered));
    };

    const handleDelete = (e, id) => {
        e.target.setAttribute('disabled', true);
        e.target.parentElement.classList.add('disabled');
        deleteFromStorage(id);
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