import PageTransition from "@/components/pageTransition";
import { useState } from "react";
import { useParams } from "react-router-dom";







export default function(){

    const [showStatus,setShowStatus] = useState(true);
    const params = useParams();
    
    return (<PageTransition showStatus={showStatus}>
        <div>
            {params.id}
        </div>
    </PageTransition>)
}