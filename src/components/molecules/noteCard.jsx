import Icon from "@mdi/react";
import PropTypes from "prop-types";

import {
  mdiCalendarBlankMultiple,
  mdiAttachment,
  mdiAccountGroup,
  mdiCheckboxMultipleMarkedCircleOutline,
  mdiCheckboxMarkedCircleOutline,
  mdiCheckCircle,
  // mdiDeleteEmptyOutline,
  // mdiAccountEditOutline,
} from "@mdi/js";

let NoteCard = (props) => {
  return (
    <a href={`/file/${props.id}`}>
      <section className="note-card" data-target={props.id}>
        {/* REACT'DA TOUCH EVENTS OLMADIĞINI BİLİYOR MUYDUNUZ ? BEN ARTIK BİLİYORUM */}
        {/* <div className="edit-card">
        <div className="delete">
          <Icon path={mdiDeleteEmptyOutline} size={1} />
        </div>
        <div className="edit-members">
          <Icon path={mdiAccountEditOutline} size={1} />
        </div>
      </div> */}
        <div className="card-content ">
          <div className="card-body">
            <p className="body-content s">
              {props.body.slice(0, 100)}
              {props.body.length > 100 ? "..." : null}
            </p>
            <div className="status">
              {/* <Icon path={mdiCheckboxMultipleMarkedCircleOutline} size={1} /> */}

              {props.status == "to-do" ? (
                <Icon path={mdiCheckboxMarkedCircleOutline} size={1} />
              ) : props.status == "in-process" ? (
                <Icon
                  path={mdiCheckboxMultipleMarkedCircleOutline}
                  size={1}
                  color="var(--pending)"
                />
              ) : (
                <Icon path={mdiCheckCircle} size={1} color="var(--sucsess)" />
              )}
            </div>
          </div>

          <div className="details">
            <div className="date">
              <Icon path={mdiCalendarBlankMultiple} size={0.6} />
              <p className="xs date-content">{props.time}</p>
            </div>
            <div className="attachment">
              {props.attachment ? (
                <Icon path={mdiAttachment} size={0.6} />
              ) : null}
              {/* <Icon path={mdiAttachment} size={0.6} /> */}
            </div>
            <div className="members">
              <Icon path={mdiAccountGroup} size={0.6} />
              <p className="xs members-content">Only You</p>
            </div>
          </div>
        </div>
      </section>
    </a>
  );
};

export default NoteCard;

NoteCard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  time: PropTypes.string,
  body: PropTypes.string,
  attachment: PropTypes.array,
  folder: PropTypes.string,
};
