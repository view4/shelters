import React, { useState } from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import FeatureVoteForm from "../FeatureVoteForm";
import styles from "./styles.module.scss";

const FeatureVoteButton = ({ featureId, }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <div className={styles.container}>
            <Button
                onClick={() => setIsFormVisible(true)}
            >
                Vote
            </Button>

            <FeatureVoteForm
                featureId={featureId}
                isOpen={isFormVisible}
                onClose={() => setIsFormVisible(false)}
            />
        </div>
    );
};

export default FeatureVoteButton;   