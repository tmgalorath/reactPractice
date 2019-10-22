import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import {Link} from 'react-router-dom'

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => {
    const {id} = this.props.match.params;
    return (
      <>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Do you really want to delete the '${this.props.stream.title}' stream`;
  }
  render() {
    console.log(this.props);

    return (
      <Modal
        content={this.renderContent()}
        header="Delete Stream"
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      ></Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
