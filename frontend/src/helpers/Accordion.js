import { useState } from "react";

const Accordion = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className="accord-item">
            <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                <h4>{title}</h4>
                <div className="sign">{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="accord-content">
                <p>{content}</p>
            </div>}
        </div>
    )
}

export default Accordion;