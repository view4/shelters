import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Container from 'modules/Core/components/ui-kit/Container';
import { useMemo, useState } from 'react';
import Button from 'modules/Core/components/ui-kit/Button';
import Modal from 'modules/Core/components/ui-kit/Modal';
import Title from 'modules/Core/components/ui-kit/Title';
import Features from 'modules/Core/components/ui-kit/Features';
import Text from 'modules/Core/components/ui-kit/Text';
import DateComponent, { formatDateTime } from 'modules/Core/components/ui-kit/Date';
import ConditionalContainer from 'modules/Core/components/ui-kit/ConditionalContainer';
import ScheduleTimeForm from '../ScheduleTimeForm';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import feed from 'modules/timemapper/state/feed';

const _ScheduledTimeDetailsModal = ({ isOpen, onClose, entity }) => {
    const [isEdit, setIsEdit] = useState(false);

    const [start, end] = useMemo(() => {
        if (!entity) return [null, null];
        const start = new Date(Number(entity.start));
        const end = new Date(Number(entity.end));
        console.log("start", start);
        console.log("end", end);
        
        return [start, end];
    }, [entity]);

    return entity && (
        <Modal isOpen={isOpen} onClose={onClose} >
            <Container m1 p3>
                <ConditionalContainer shouldRender={!isEdit} >
                    <Features
                        features={[
                            {
                                content: <Title>{entity?.name}</Title>
                            },
                            {
                                content: <Text>{entity?.text}</Text>
                            },
                            {
                                content: <Container maxWidth b1grey mt1 />
                            },
                            {
                                content: <DateComponent date={start} formatter={formatDateTime} />
                                // <Title>{start}</Title>
                            },

                            {
                                // content: <Title>{end}</Title>
                                content: <DateComponent date={end} formatter={formatDateTime} />
                            },
                            {
                                content: (
                                    <Container flex flexEnd>
                                        <Button onClick={() => setIsEdit(!isEdit)}> {"Edit"}</Button>
                                    </Container>
                                )
                            }
                        ]}
                    />
                </ConditionalContainer>
                <ConditionalContainer shouldRender={isEdit} >
                    <ScheduleTimeForm
                        isOpen={true}
                        close={() => setIsEdit(false)}
                        initialState={{
                            startDate: new Date(start),
                            endDate: new Date(end),
                            startTime: new Date(start),
                            endTime: new Date(end),
                            name: entity?.name,
                            id: entity?.id,
                            text: entity?.text,
                        }}
                        id={entity?.id}
                        boothId={entity?.boothId}
                    />
                </ConditionalContainer>

            </Container>
        </Modal>
    )
}

export default strappedConnected(
    _ScheduledTimeDetailsModal,
    {
        entity: (state, { id }) => feed.cells.fetchEntity.selector(id)(state),
    }, 
    {}, 
    ({ entity }) => ({
        entity,
    })
)