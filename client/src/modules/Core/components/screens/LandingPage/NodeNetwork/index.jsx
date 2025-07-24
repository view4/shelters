import { useEffect, useMemo, useState } from "react";
import useFocusedId from "modules/Core/hooks/useFocusedId";
import Node from "../Node";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import { randomise, randomiseFloat } from "modules/Core/utils/number";
import styles from "./styles.module.scss";

const getBgNodes = () => Array.from({ length: 36 }, (_, i) => i)
const getFloatingNature = (i) => {
    if (i % 5 == 0) return "pulsating";
    if (i % 2 == 0) return "dropping";
    return "ascending"
}
const NodeNetwork = ({
    nodes = [],
    clickable = true,
    background,
    size = "medium",
    spaceBetween = 18,
    range = 5,
    opacityRange = [50, 100],
    sizeRange,
    nature,
    floating,
    ...props
}) => {
    const { focusedId, setFocusedId, unFocus } = useFocusedId();
    const [coords, setCoords] = useState([]);

    const organise = () => {
        const newCoords = nodes
            .map(() => {
                let x = randomise(1, range);
                let y = randomise(1, range);
                if (y == 5) y = 4.5;
                if (x == 1 && y == 1) y = 2;
                if (x == 2 && y == 1) x = 3;
                return { x: x * spaceBetween, y: y * spaceBetween };
            });
        setCoords(newCoords);
    };


    const reOrganise = (delayIfFocused = true) => {
        if (Boolean(focusedId) && delayIfFocused) return;
        organise();
        setFocusedId(null);
    };

    useEffect(() => {
        organise();
        if (!props?.static) {
            const timeout = setInterval(() => reOrganise(true), 18000);
            return () => clearInterval(timeout);
        }
    }, [nodes?.length]);

    const connections = useMemo(() => Boolean(background && nodes?.length) && (
        <svg className={styles.connector} >
            {
                coords?.map((coord, i) => (coord?.x && coord?.y) && (
                    <line
                        x1={coord.x + "vw"}
                        y1={(100 - coord.y) + "vh"}
                        x2={(coords[i + 1]?.x || coords[0].x) + "vw"}
                        y2={(100 - (coords[i + 1]?.y || coords[0].y)) + "vh"}
                        stroke="#8080802e"
                        strokeWidth="0.18rem"
                        opacity={randomiseFloat(0.36, 0.54)}
                    />
                ))
            }
        </svg>

    ), [coords]);

    const _nodes = useMemo(() => Boolean(coords?.length) && (
        nodes.map((node, i) =>
            Boolean(coords[i]?.x) && <Node
                key={i}
                node={node}
                x={coords[i].x}
                y={coords[i].y}
                opacity={randomise(opacityRange[0], opacityRange[1])}
                onClick={clickable && ((e) => {
                    e.stopPropagation()
                    setFocusedId(i)
                })}
                sizeRem={sizeRange && randomiseFloat(...sizeRange)}
                isFocused={focusedId === i}
                size={size}
                nature={nature == "floating" && getFloatingNature(i)}
            />)
    ),
        [nodes, focusedId, setFocusedId, coords]);

    const bg = useMemo(() => background && (
        <NodeNetwork
            size={"extra-small"}
            nodes={getBgNodes()}
            clickable={false}
            background={false}
            static
            spaceBetween={3}
            range={33}
            opacityRange={[0, 50]}
            sizeRange={[0.1, 0.5]}
            nature={"floating"}
        />
    ), [background])

    return (
        <Container onClick={unFocus}>
            {bg}
            {connections}
            {_nodes}
        </Container>
    )
}

export default NodeNetwork;