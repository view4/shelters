import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";

const BoothParentCard = ({ parent, onClick, ...props }) => {
    if (!parent) return null;

    return (
        <Card 
            className={styles.card} 
            onClick={onClick}
            clickable
            borderless
            {...props}
        >
            <Container flex col>
                <Text className={styles.name}>{parent.name}</Text>
            </Container>
        </Card>
    );
};

export default strappedConnected(
    BoothParentCard,
    {
        parent: (state, { boothId }) => {
            const booth = feed.cells.fetchEntity.selector(boothId)(state);
            return booth?.parent;
        }
    },
    {},
    ({ parent }) => {
        const navigate = useNavigate();
        
        const onClick = useCallback(() => parent?.id && navigate(`/booths/${parent.id}`), [parent?.id, navigate]);

        return {
            onClick,
            parent
        };
    }
); 