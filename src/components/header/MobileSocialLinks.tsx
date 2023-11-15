import React from "react";
import {
    FaLinkedin,
    FaGithubSquare,
    FaStackOverflow,
    FaFreeCodeCamp,
    FaTwitterSquare
} from "react-icons/fa"

import "../layout.css"
import { IContacts } from "../../interface";

interface MobileSocialLinksProps {
    contacts: IContacts;
}

const MobileSocialLinks: React.FC<MobileSocialLinksProps> = ({ contacts }) => (
    <div className="bottom-bar py-1">
        { typeof contacts.linkedin === 'string' &&
            <a className=" text-primary"
                href={contacts.linkedin}>
                <span title="Linked In">
                    <FaLinkedin size={26} style={{ color: "primary" }} />
                </span>
            </a>
        }

        { typeof contacts.github === 'string' &&
            <a className="text-light"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{ color: "light" }} />
                </span>
            </a>
        }

        { typeof contacts.stackoverflow === 'string' &&
            <a className="text-warning"
                href={contacts.stackoverflow}>
                <span title="Stack Overflow">
                    <FaStackOverflow size={26} style={{ color: "warning" }} />
                </span>
            </a>
        }

        { typeof contacts.freecodecamp === 'string' &&
            <a className="text-success"
                href={contacts.freecodecamp}>
                <span title="freeCodeCamp">
                    <FaFreeCodeCamp size={26} style={{ color: "success" }} />
                </span>
            </a>
        }

        { typeof contacts.twitter === 'string' &&
            <a className="text-info"
                href={contacts.twitter}>
                <span title="Twitter">
                    <FaTwitterSquare size={26} style={{ color: "info" }} />
                </span>
            </a>
        }
    </div>
);

export default MobileSocialLinks;