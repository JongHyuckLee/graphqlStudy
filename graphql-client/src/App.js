import axios from 'axios'
import React from 'react';

function App() {
  const [graphqlData, setGraphqlData] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const result = await axios.get('http://localhost:4000/graphql',  {
        params: {
          query: "{helloWorld}"
        }
      });
      setGraphqlData(JSON.stringify(result?.data));
    })()
  }, [])
  return (
    <div className="App">
      <div id="data">{graphqlData}</div>
    </div>
  );
}

export default App;
