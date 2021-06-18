import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../actions";
import Helmet from "react-helmet";

class UserList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderHead() {
    return (
      <Helmet>
        <meta
          property="og:title"
          content={`${this.props.users.length} Users Found`}
        />
        <title>{`${this.props.users.length} Users Found`}</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
        {this.renderHead()}
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsers }, dispatch);

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(UserList),
  loadData: (store) => store.dispatch(fetchUsers()),
};
