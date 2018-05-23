import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries} from 'react-vis';

function Resultados({datos, x, y}) {
    return (
      <div style={{ marginLeft: 80}}>
        <XYPlot
          width={window.innerWidth - 400}
          height={300}
          padding={100}
          >
          <XAxis title={x} style={{fill: '#6b6b76', fontWeight: 600, fontSize: 12}}/>
          <YAxis title={y} style={{fill: '#6b6b76', fontWeight: 600, fontSize: 12}}/>
          <HorizontalGridLines />
          <LineMarkSeries data={datos} />
        </XYPlot>
      </div>
    );
}

export default Resultados;
