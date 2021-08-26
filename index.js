import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3';

const App = props => {
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: 'new Node',
      parentNodeId: 'O-6066'
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    console.log('d3', d3.event);
    alert('clicked ' + nodeId);
  }

  useEffect(() => {
    d3.csv(
      'https://raw.githubusercontent.com/siddharthpal/farewell-org-chart/master/org.csv'
    ).then(data => {
      setData(data);
    });
  }, [true]);
  return (
    <div>
      <OrgChartComponent
        setClick={click => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
