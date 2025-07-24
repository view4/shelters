import React from "react";
import { useCallback } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { useNavigate } from "react-router-dom";
import feed from "modules/mapal/submodules/features/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import styles from "./styles.module.scss";

const FeatureParentCard = strappedConnected(
    Card,
    {
        parent: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "parent")(state)
    },
    {},
    ({ parent }) => {
        const navigate = useNavigate();

        const handleNavigateToParent = useCallback(() => {
            if (parent?.id) {
                navigate(`/feature/${parent.id}`);
            }
        }, [parent?.id, navigate]);

        if (!parent) return {
            shouldRender: false,
        }

        return {
            className: styles.parentCard,
            children: (
                <Container flex col p2>
                    <Container flex spaceBetween alignCenter mb2>
                        <Title className={styles.parentTitle}>Parent Feature</Title>
                        <Button
                            onClick={handleNavigateToParent}
                            text="View Parent"
                            size="sm"
                        />
                    </Container>
                    <Container flex col gap1>
                        <Text className={styles.parentName}>{parent.name}</Text>
                        <Text className={styles.parentText}>{parent.text}</Text>
                    </Container>
                </Container>
            )
        };
    }
);

export default FeatureParentCard; 