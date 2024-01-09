import { Link } from "react-router-dom";

const DraftCard = ({ draft, handleClick }) => {
    const handleMouseEnter = (e) => {
        e.currentTarget.lastChild.classList.toggle("hidden");
        e.currentTarget.lastChild.previousSibling.classList.toggle("hidden");
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.lastChild.classList.toggle("hidden");
        e.currentTarget.lastChild.previousSibling.classList.toggle("hidden");
    };

    return (
        <Link to={'/new'} state={draft} >
            <div className="draft-card" onClick={() => handleClick(draft)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <div className="text">
                    <strong>Juodraštis</strong>
                    {draft.brand ? (
                        <span className="draft-title">{draft.brand}</span>
                    ) : (
                        <span className="draft-title">(be )</span>
                    )}
                </div>
                <span className="draft-date">{draft.date}</span>
                <button className="hidden">Ištrinti</button>
            </div>
        </Link>
    );
};

export default DraftCard;