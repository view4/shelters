import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import { Card } from "modules/Core/sub-modules/ui-kit/exports";

import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";
import feed from "../../state/feed";
import { BOOTH_KINDS } from "../../consts";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const BoothParentFieldComponent = ({ parentId, name, id, kind }) => {
    const getStampText = () => {
        switch (kind) {
            case BOOTH_KINDS.MALCHUT:
                return "Teachings";
            case BOOTH_KINDS.MAPAL:
                return "Mapal";
            default :
                return "Life";
        }
    };

    if (!parentId) return <Container className={styles.hidden}/>

    return (
        <Container className={styles.parentFieldContainer}>
            <InputLabel label={'Parent Booth'} />
            <Container className={styles.parentInfoContainer}>
                <Title className={styles.parentName}>{name}</Title>
                <Container className={styles.stampContainer}>
                    <Stamp 
                        nature='somewhat_certain' 
                        stamp={getStampText()} 
                        className={styles.stamp}
                    />
                </Container>
            </Container>
        </Container>
    );
};

const BoothParentField = strappedConnected(
    BoothParentFieldComponent,
    {
        parent: (state, { parentId }) => feed.cells.fetchEntity.selector(parentId)(state)
    },
    {
        fetchParent: feed.cells?.fetchEntity.action
    },
    ({ fetchParent, parentId, parent, kind, onChange, ...props }) => {
        console.log('parentId', parentId)
        console.log(props)
        useOnLoad(() => {
            if (parentId) {
                fetchParent({ id: parentId })

            }
        }, !parent?.name && parentId, [fetchParent, parentId])
        

        useEffect(() => {
            if (parentId) {
                console.log('onChange', parentId)
                onChange(parentId)
            }
        }, [parentId])

        return {
            shouldRender: Boolean(parentId),
            name: parent?.name,
            id: parent?.id,
            kind: parent?.kind || kind
        }
    }
);

export default BoothParentField; 