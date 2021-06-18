import React from "react";
import { fetchAdmins } from "../actions";
import { connect } from "react-redux";
import requireAuth from "../components/hocs/requireAuth";

class AdminListPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderAdmins = this.renderAdmins.bind(this);
  }

  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admin.map((admin) => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default {
  component: connect(mapStateToProps, { fetchAdmins })(
    requireAuth(AdminListPage)
  ),
  loadData({ dispatch }) {
    return dispatch(fetchAdmins());
  },
};
