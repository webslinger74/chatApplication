import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({upLoadState, percentageUpLoaded }) => 
upLoadState === "uploading" &&
     (  
    <Progress className="progress__bar" percent={percentageUpLoaded} progress indicating size="medium" inverted />
    )

export default ProgressBar;
