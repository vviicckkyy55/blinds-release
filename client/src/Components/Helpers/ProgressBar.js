import React from 'react';
import { Progress } from 'reactstrap';


export default function ProgressBar() {
  
  return (
    <div>
      <Progress max="100" color="success" value={this.state.loaded} className="mt-4 mb-1">
        {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
      </Progress>
    </div>
  )
}
