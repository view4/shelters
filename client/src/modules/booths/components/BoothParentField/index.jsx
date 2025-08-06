import { useEffect, useMemo } from "react";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";
import feed from "../../state/feed";
import { BOOTH_KINDS } from "../../consts";
import styles from "./styles.module.scss";


const STAMP_TEXT = {
    [BOOTH_KINDS.MALCHUT]: "Teachings",
    [BOOTH_KINDS.MAPAL]: "Mapal",
    "LIFE": "Life"
}

const BoothParentFieldComponent = ({ parentId, name, stampText }) => {
    if (!parentId) return <Container className={styles.hidden} />

    return (
        <Container className={styles.parentFieldContainer}>
            <InputLabel label={'Parent Booth'} />
            <Container className={styles.parentInfoContainer}>
                <Title className={styles.parentName}>{name}</Title>
                <Container className={styles.stampContainer}>
                    <Stamp
                        nature='somewhat_certain'
                        stamp={stampText}
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
        useOnLoad(() => {
            if (parentId) {
                fetchParent({ id: parentId })

            }
        }, !parent?.name && parentId, [fetchParent, parentId])


        useEffect(() => {
            if (parentId) {
                onChange(parentId)
            }
        }, [parentId])

        return {
            shouldRender: Boolean(parentId),
            name: parent?.name,
            id: parent?.id,
            stampText: useMemo(() => {
                if (!parent) return null
                if (parent?.mapal?.id) return STAMP_TEXT[BOOTH_KINDS.MAPAL]
                if (parent?.malchut?.id) return STAMP_TEXT[BOOTH_KINDS.MALCHUT]
                return STAMP_TEXT.LIFE
            }, [parent])

        }
    }
);

export default BoothParentField; 