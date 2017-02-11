const log = console.log.bind(console);

/***********************************
 * Constraints
 ***********************************/

// Action
const getSupportedConstraints = (dispatch) => {
  const keys = navigator.mediaDevices.getSupportedConstraints();
  let supported = Object.keys(keys).sort((a, b) => {
    if (a.startsWith('moz')) return 1;
    return (a.length > b.length) ? 1 : -1;
  });
  dispatch({
    type: 'SUPPORTED_CONSTRAINTS',
    supported, supported,
  })
}

// Reducer
const constraintsReducer = (state = {supported: []}, action) => {
  switch (action.type) {
    case 'SUPPORTED_CONSTRAINTS':
      return Object.assign({}, state, {
        supported: action.supported
      })
    default:
      return state
  }
}

// Components
class Constraints extends React.Component {
  componentDidMount() {
    this.props.getSupportedConstraints();
  }

  render() {
    const { supported, tracks } = this.props;
    const th = supported.map((key) => <th>{key}</th>)

    const consts = tracks.map((track) => {
      const values = track.getConstraints();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>constraints({track.kind})</td>{td}</tr>;
    });

    const caps = tracks.map((track) => {
      const values = track.getCapabilities();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>capabilities({track.kind})</td>{td}</tr>;
    });

    const settings = tracks.map((track) => {
      const values = track.getSettings();
      const td = supported
        .map((key) => values[key])
        .map((value) => <td>{JSON.stringify(value)}</td>);

      return <tr><td>settings({track.kind})</td>{td}</tr>;
    });

    return (
      <section>
        <h2>Constraints</h2>
        <table>
          <tr>
            <th>type</th>
            {th}
          </tr>
          {consts}
          {caps}
          {settings}
        </table>
      </section>
    )
  }
}

// Container
const ConstraintsContainer = ReactRedux.connect(
  (state) => {
    const stream = state.stream.stream;
    return {
      supported: state.constraints.supported,
      tracks: stream ? stream.tracks() : [],
    }
  },
  (dispatch) => {
    return {
      getSupportedConstraints() {
        getSupportedConstraints(dispatch)
      }
    }
  }
)(Constraints);
