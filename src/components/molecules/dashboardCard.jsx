import Icon from "@mdi/react";
import PropTypes from "prop-types";

function DashboardCard(props) {
  return (
    <article data-target={props.id}>
      <Icon path={props.icon} size={1} />

      <h4>{props.cardName}</h4>
    </article>
  );
}

DashboardCard.propTypes = {
  icon: PropTypes.string,
  cardName: PropTypes.string,
  id: PropTypes.number,
};

export default DashboardCard;
