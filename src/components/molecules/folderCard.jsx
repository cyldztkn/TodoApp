import Icon from "@mdi/react";
import PropTypes from "prop-types";

function FolderCard(props) {
  return (
    <article data-target={props.id}>
      <Icon path={props.icon} size={1} />

      <h4>{props.cardName}</h4>
    </article>
  );
}

FolderCard.propTypes = {
  icon: PropTypes.string,
  cardName: PropTypes.string,
  id: PropTypes.number,
};

export default FolderCard;
