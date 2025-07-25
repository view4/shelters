import { useEffect, useMemo, useState } from "react";
import cx from 'classnames';
import { isNumber } from 'lodash';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import TitleSection from 'modules/Core/sub-modules/ui-kit/components/SplitScreen/TitleSection';
import useSidebar from "modules/Core/components/Sidebar/useSidebar";
import styles from './styles.module.scss';

export default (panels, commonProps) => {
    const [panelWidth, setPanelWidth] = useState();
    const [state, setState] = useState([]);

    const {
        open, drawer
    } = useSidebar();

    useEffect(() => {
        setState(panels)
    }, [panels?.length, panels]);

    useEffect(() => {
        setPanelWidth(`${100 / state?.filter(p => !p?.minimized)?.length}%`)
    }, [state])

    const setPanelState = (index, change) => {
        const s = state?.slice();
        s[index] = { ...s[index], ...change };
        setState(s);
    }

    const maximizePanel = (index) => setPanelState(index, { minimized: false });
    const minimizePanel = (index) => setPanelState(index, { minimized: true });
    const appendPanel = (panel) => setState([...state, panel]);

    const jsx = useMemo(() => (
        <Container className={styles.panelsContainer} flex span>
            {
                state?.map(({
                    Component, props, minimized, width,
                    className
                } = {}, i) => (
                    <Container
                        className={cx(styles.panel, className, { [styles.minimized]: minimized })}
                        key={i}
                        style={{ width: minimized ? `${0}%` :( width ?? panelWidth) }}
                    >
                        {Component && !minimized && (
                            <Component
                                maximizePanel={(index) => maximizePanel((isNumber(index) && index) || i)}
                                minimizePanel={(index) => minimizePanel((isNumber(index) && index) || i)}
                                setPanelState={setPanelState}
                                appendPanel={appendPanel}
                                {...commonProps}
                                {...props}
                            />
                        )}
                    </Container>
                ))
            }
        </Container >
    ), [panelWidth, state, commonProps]);


    const headerChildren = useMemo(() => (
        <>
            {state?.map((p, i) => p?.title && (
                <TitleSection
                    className={cx(styles.titleSection, { [styles.minimized]: p?.minimized })}
                    title={p.title}
                    actions={{
                        ...p?.titleActions,
                        right: p?.titleActions?.right ?? (i === 0 && open),
                    }}
                    width={p?.minimized ? `${0}%` : panelWidth}>
                    <span className={cx("chevron-right-container", styles.chevron)} />
                    {i === 0 && drawer}
                </TitleSection>
            ))}
        </>
    ), [state, panelWidth, open, drawer])

    return {
        jsx,
        width: panelWidth,
        headerChildren
    }
}


